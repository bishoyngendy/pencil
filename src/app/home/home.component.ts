import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import * as MediumEditor from 'medium-editor';
import * as katex from 'katex';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  textForm!: FormGroup;
  textValue!: string;
  editor: any;
  mathContent = '';

  @ViewChild('editorRef') editorRef!: ElementRef;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) {
    this.getUserData();
  }

  ngAfterViewInit() {
    const edit = this.editorRef.nativeElement;
    this.editor = new MediumEditor(edit, {
      placeholder: true,
    });
    this.editor.subscribe('editableInput', (event: any) => {
      if (event.data === '$') {
        this.updateLatexNode();
      }
      this.updateUser(this.editor.getContent());
    });
  }

  updateUser(value: string) {
    this.userService.updateCurrentUser(value);
    this.textValue = value;
  }

  updateLatexNode() {
    const initialEditorContent = this.editor.getContent();
    const firstIndex = initialEditorContent.indexOf('$');
    if (firstIndex !== -1) {
      const secondIndex = initialEditorContent
        .substring(firstIndex + 1)
        .indexOf('$');

      if (secondIndex !== -1) {
        const latextEquation = initialEditorContent.substring(
          firstIndex,
          firstIndex + secondIndex + 2
        );
        const latextEquationWithoutDollarSigns = latextEquation.substr(
          1,
          latextEquation.length - 2
        );
        const convertedLatex = katex.renderToString(
          latextEquationWithoutDollarSigns,
          {
            throwOnError: true,
          }
        );
        const tempNode = document.createElement('span');
        tempNode.innerHTML = convertedLatex;
        tempNode.childNodes[0].childNodes[0].remove();
        const f = this.editor.exportSelection();
        this.editor.setContent(
          initialEditorContent.replace(latextEquation, tempNode.innerHTML)
        );
        document.getElementById('logout')?.focus();
      }
    }
  }

  getUserData() {
    this.userService.getUserData().then((res) => {
      this.editor.setContent(res.value);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
