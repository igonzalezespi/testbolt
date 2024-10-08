import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: any;
  private user: any | null = null;

  constructor() {
    this.auth = firebase().auth();
    this.auth.onAuthStateChanged((user: any) => {
      this.user = user;
    });
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  getCurrentUser(): any | null {
    return this.user;
  }
}