import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  isLogin: boolean = true;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
  }

  async onSubmit() {
    try {
      if (this.isLogin) {
        await this.authService.signIn(this.email, this.password);
      } else {
        await this.authService.signUp(this.email, this.password);
      }
      this.routerExtensions.navigate(['/home']);
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error (show message to user)
    }
  }
}