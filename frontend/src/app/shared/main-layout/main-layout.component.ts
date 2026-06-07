import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="top-nav">
      <div class="nav-brand">NexCash</div>
      <div class="nav-links">
        @if (authService.currentUserRole() === "USER") {
          <a routerLink="/user">User Portal</a>
        }
        @if (authService.currentUserRole() === "MANAGER") {
          <a routerLink="/manager">Manager Dashboard</a>
        }
        <a href="javascript:void(0)" (click)="logout()" class="logout-link">Logout</a>
      </div>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
