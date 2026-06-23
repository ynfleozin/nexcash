import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  authService = inject(AuthService);
  private router = inject(Router);
  readonly dashboardLink = computed(() =>
    this.authService.currentUserRole() === 'MANAGER' ? '/manager' : '/user',
  );
  readonly dashboardLabel = computed(() =>
    this.authService.currentUserRole() === 'MANAGER'
      ? 'Manager Dashboard'
      : 'User Portal',
  );

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
