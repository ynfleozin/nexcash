import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseListComponent } from "./features/expenses/expense-list/expense-list.component";
import { ToastComponent } from "./shared/toast/toast.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ExpenseListComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
