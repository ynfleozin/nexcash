import { inject, Injectable, signal } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  currentUserRole = signal<'USER' | 'MANAGER' | null>(null);

  getRoleByEmail(email: string): 'MANAGER' | 'USER' {
    return email === 'manager@nexcash.com' ? 'MANAGER' : 'USER';
  }

  constructor() {
    authState(this.auth).subscribe((user) => {
      if (user && user.email) {
        const role = this.getRoleByEmail(user.email);
        this.currentUserRole.set(role);
      } else {
        this.currentUserRole.set(null);
      }
    });
  }

  async login(email: string, pass: string) {
    const credential = await signInWithEmailAndPassword(this.auth, email, pass);

    if (credential.user.email) {
      const role = this.getRoleByEmail(credential.user.email);
      this.currentUserRole.set(role);
    }

    return credential;
  }

  logout() {
    return signOut(this.auth);
  }

  isAuthenticated(): boolean {
    return this.currentUserRole() !== null;
  }

  hasRole(role: 'USER' | 'MANAGER'): boolean {
    return this.currentUserRole() === role;
  }
}
