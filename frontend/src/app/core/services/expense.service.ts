import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/expenses';

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  createExpense(expense: Partial<Expense>): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }
}
