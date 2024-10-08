import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptHttpClientModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { GoogleMapsModule } from '@nativescript/google-maps/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';

// Import firebase modules
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptHttpClientModule,
    NativeScriptFormsModule,
    GoogleMapsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    AuthComponent,
    ProfileComponent
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor() {
    // Initialize Firebase
    firebase().initializeApp({
      apiKey: "AIzaSyCklr5gi9S3_1Xeop_BBNyBmJJumGgm3yY",
      authDomain: "testbolt-131f9.firebaseapp.com",
      databaseURL: "https://testbolt-131f9.firebaseio.com",
      projectId: "testbolt-131f9",
      storageBucket: "testbolt-131f9.appspot.com",
      messagingSenderId: "136757400441",
      appId: "1:136757400441:ios:43d95df00bcf6d07bc15a8",
      measurementId: "G-ABCDEFGHIJ"
    }).then(() => console.log("Firebase initialized successfully"))
      .catch(error => console.error('Firebase init error:', error));
  }
}