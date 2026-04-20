import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (toastService.toast(); as toast) {
      <div class="toast-container" [ngClass]="toast.type">
        {{ toast.message }}
      </div>
    }
  `,
  styles: [
    `
      .toast-container {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
      }
      .success {
        background-color: var(--status-approved);
      }
      .error {
        background-color: var(--status-rejected);
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ToastComponent {
  toastService = inject(ToastService);
}
