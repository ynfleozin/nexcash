import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { Expense } from '../../../core/services/expense.model';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../../core/services/expense.service';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  @Input() role: 'USER' | 'MANAGER' = 'USER';

  expenses = signal<Expense[]>([]);

  isModalOpen = false;
  private expenseService = inject(ExpenseService);
  private toastService = inject(ToastService);

  totalAmount = computed(() =>
    this.expenses().reduce((acc, exp) => acc + exp.price, 0),
  );

  totalApproved = computed(() =>
    this.expenses()
      .filter((exp) => exp.status === 'APPROVED')
      .reduce((acc, exp) => acc + exp.price, 0),
  );

  totalPending = computed(() =>
    this.expenses()
      .filter((exp) => exp.status === 'PENDING')
      .reduce((acc, exp) => acc + exp.price, 0),
  );

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (data) => this.expenses.set(data),
      error: (err) => console.error(err),
    });
  }

  onDelete(id: string) {
    if (confirm('Are you sure?')) {
      this.expenseService.deleteExpense(id).subscribe({
        next: () => {
          this.expenses.update((prev) => prev.filter((e) => e.id !== id));
          this.toastService.show('Expense deleted!', 'success');
        },
      });
    }
  }

  updateStatus(id: string, newStatus: 'APPROVED' | 'REJECTED') {
    this.expenseService.updateStatus(id, newStatus).subscribe({
      next: (updated) => {
        this.expenses.update((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: updated.status } : e)),
        );
        this.toastService.show(
          `Expense ${newStatus.toLowerCase()}!`,
          'success',
        );
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
