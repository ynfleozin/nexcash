import { Routes } from '@angular/router';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: ExpenseListComponent,
    canActivate: [authGuard],
    data: { role: 'USER' },
  },
  {
    path: 'manager',
    component: ExpenseListComponent,
    canActivate: [authGuard],
    data: { role: 'MANAGER' },
  },
];
