import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserRole = signal<'USER' | 'MANAGER' | null>(null);

  login(role: 'USER' | 'MANAGER') {
    this.currentUserRole.set(role);
  }

  logout() {
    this.currentUserRole.set(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserRole() !== null;
  }

  hasRole(role: 'USER' | 'MANAGER'): boolean {
    return this.currentUserRole() === role;
  }

  constructor() {}
}
