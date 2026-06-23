import { Routes } from '@angular/router';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { LandingComponent } from './features/public/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'user',
        component: ExpenseListComponent,
        data: { role: 'USER' },
      },
      {
        path: 'manager',
        component: ExpenseListComponent,
        data: { role: 'MANAGER' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
