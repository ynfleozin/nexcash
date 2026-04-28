import { Routes } from '@angular/router';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
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
];
