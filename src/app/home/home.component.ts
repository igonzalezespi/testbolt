import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit() {}

  navigateToMap() {
    this.routerExtensions.navigate(['/map']);
  }

  navigateToProfile() {
    this.routerExtensions.navigate(['/profile']);
  }
}