import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';

// declare var MediumEditor :any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  textForm!: FormGroup;
  title = 'pencil home';
  textValue!: string;

  // editor: any;
  
  // @ViewChild('editable', { static: true })
  // editable!: ElementRef;
  
  ngAfterViewInit(): void {
      // this.editor = new MediumEditor(this.editable.nativeElement, {
      //   toolbar: {
      //     allowMultiParagraphSelection: true,
      //     buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
      //     diffLeft: 0,
      //     diffTop: -10,
      //     firstButtonClass: 'medium-editor-button-first',
      //     lastButtonClass: 'medium-editor-button-last',
      //     standardizeSelectionStart: false,
      //     static: false,
      //     align: 'center',
      //     sticky: false,
      //     updateOnEmptySelection: false
      // }
      // });
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
    this.userService.getUserData()
    .then(res => {
      this.textValue = res.value
    })
  }

  logout() {
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/']);
    })
  }

  valuechange(newValue: string) {
    if (newValue) {
      this.textValue = newValue;
      this.userService.updateCurrentUser(this.textValue)
    }
  }
}
