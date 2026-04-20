import { Component } from '@angular/core';
import { Expense } from '../../../core/services/expense.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent {
  expenses: Expense[] = [
    {
      id: '1',
      description: 'Uber to Airport',
      price: 45.5,
      status: 'APPROVED',
    },
    { id: '2', description: 'Team Lunch', price: 120.0, status: 'PENDING' },
    {
      id: '3',
      description: 'Software License',
      price: 299.99,
      status: 'REJECTED',
    },
  ];
}
