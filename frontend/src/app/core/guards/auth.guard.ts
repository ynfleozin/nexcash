import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { Auth, authState } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  const auth = inject(Auth);

  const user = await firstValueFrom(authState(auth));

  if (user?.email) {
    authService.currentUserRole.set(authService.getRoleByEmail(user.email));
  }

  const expectedRole = route.data['role'];

  if (!authService.isAuthenticated() || !authService.hasRole(expectedRole)) {
    toastService.show('Access denied. Please log in.', 'error');
    await authService.logout();
    router.navigate(['/']);
    return false;
  }

  return true;
};
