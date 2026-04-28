import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const expectedRole = route.data['role'];

  if (!authService.isAuthenticated() || !authService.hasRole(expectedRole)) {
    toastService.show('Acess denied. Please log in.', 'error');

    router.navigate(['/']);
    return false;
  }

  return true;
};
