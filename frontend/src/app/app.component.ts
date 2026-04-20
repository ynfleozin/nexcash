import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseListComponent } from "./features/expenses/expense-list/expense-list.component";
import { ExpenseFormComponent } from "./features/expenses/expense-form/expense-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ExpenseListComponent, ExpenseFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
