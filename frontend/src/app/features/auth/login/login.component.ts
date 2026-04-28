import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  simulateLogin(role: 'USER' | 'MANAGER') {
    this.authService.login(role);
    this.toastService.show(
      `Welcome back, ${role.toLocaleLowerCase()}!`,
      'success',
    );

    const destination = role === 'USER' ? '/user' : '/manager';
    this.router.navigate([destination]);
  }
}
