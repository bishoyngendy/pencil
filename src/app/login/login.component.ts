import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public authService: AuthService, private router: Router) {}

  tryGoogleLogin() {
    this.authService.loginWithGoogle().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
