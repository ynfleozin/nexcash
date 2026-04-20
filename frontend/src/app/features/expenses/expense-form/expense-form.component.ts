import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from '../../../core/services/expense.service';
import { Expense } from '../../../core/services/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent {
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);

  expenseForm = this.fb.group({
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0.01)]],
    date: ['', [Validators.required]],
    status: ['PENDING'],
  });

  onSubmit() {
    if (this.expenseForm.valid) {
      const formDados = this.expenseForm.getRawValue();

      const newExpense: Partial<Expense> = {
        description: formDados.description!,

        price: Number(formDados.price),

        date: formDados.date!,

        status: formDados.status as 'PENDING' | 'APPROVED' | 'REJECTED',
      };

      this.expenseService.createExpense(newExpense).subscribe({
        next: () => {
          this.saved.emit();
          this.close.emit();
        },
        error: (err) => console.error('Error saving expense:', err),
      });
    }
  }
}
