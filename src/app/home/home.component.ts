import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import * as MediumEditor from 'medium-editor';

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

  @ViewChild('media') media!: ElementRef;

  ngAfterViewInit() {
    const edit = this.media.nativeElement;
    this.editor = new MediumEditor(edit, {
      placeholder: false,
    });
    this.editor.subscribe('editableInput', (event: any) => {
      if (event.inputType && event.inputType !== '') {
        this.updateUser(this.editor.getContent());
      }
    });
  }

  updateUser(value: string) {
    console.log('update', value);
    this.userService.updateCurrentUser(value);
    this.textValue = value;
    console.log(this.mathContent);
  }

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.getUserData();
  }

  createForm() {
    this.textForm = this.fb.group({
      textValue: [''],
    });
  }

  getUserData() {
    this.userService.getUserData().then((res) => {
      this.editor.setContent(res.value);
    });
  }

  logout() {
    this.authService.doLogout().then((res) => {
      this.router.navigate(['/']);
    });
  }
}
