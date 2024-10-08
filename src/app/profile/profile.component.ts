import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  async signOut() {
    try {
      await this.authService.signOut();
      this.routerExtensions.navigate(['/auth']);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}