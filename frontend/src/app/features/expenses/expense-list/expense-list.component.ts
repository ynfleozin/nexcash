import { Component, inject } from '@angular/core';
import { Expense } from '../../../core/services/expense.model';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../../core/services/expense.service';
import { ExpenseFormComponent } from "../expense-form/expense-form.component";

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent {
  expenses: Expense[] = [];
  isModalOpen = false;

  private expenseService = inject(ExpenseService);

  ngOnInit(): void {
    this.loadExpenses;
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (data) => (this.expenses = data),
      error: (err) => console.error(err),
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
