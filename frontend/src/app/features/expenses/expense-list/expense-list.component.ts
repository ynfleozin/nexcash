import { Component, inject } from '@angular/core';
import { Expense } from '../../../core/services/expense.model';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent {
  expenses: Expense[] = [];

  private expenseService = inject(ExpenseService);

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses = data;
      },
      error: (err) => {
        console.error('Erro ao buscar as despesas da API', err);
      },
    });
  }
}
