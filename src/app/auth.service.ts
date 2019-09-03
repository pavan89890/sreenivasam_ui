import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  sendToken(currentUser: User) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }

  getToken() {
    return localStorage.getItem("currentUser");
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }
}
