import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  isLoading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email!, password!);
      this.toastService.show('Login successful!', 'success');

      const destination =
        email === 'manager@nexcash.com' ? '/manager' : '/user';
      this.router.navigate([destination]);
    } catch (error: any) {
      console.error('Firebase Auth Error: ', error);
      this.toastService.show('Invalid email or password', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  fillCredentials(role: 'USER' | 'MANAGER') {
    const email =
      role === 'MANAGER' ? 'manager@nexcash.com' : 'user@nexcash.com';
    this.loginForm.patchValue({ email, password: 'nexcash123' });
  }
}
