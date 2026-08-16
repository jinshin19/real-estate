// Angular Imports
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmCardImports } from 'spartan-ng/helm/card';
import { HlmInputImports } from 'spartan-ng/helm/input';
import { HlmButtonImports } from 'spartan-ng/helm/button';
// Api's
import { AuthService } from '@api';
// Login Form
import { loginForm } from './login.form';

@Component({
  selector: 'app-login',
  imports: [HlmCardImports, HlmInputImports, HlmButtonImports, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  protected readonly loginForm = loginForm();

  protected readonly onSubmit = () => {
    if (this.loginForm.invalid) {
      this.loginForm.markAsUntouched();
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response: any) => {
        if (response.status === 200 && response.success) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.log('Login error:', error);
      },
    });
  };
}
