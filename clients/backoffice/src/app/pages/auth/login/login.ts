// Angular Imports
import { Router } from '@angular/router';
import { toast } from '@spartan-ng/brain/sonner';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HlmCardImports } from 'spartan-ng/helm/card';
import { HlmInputImports } from 'spartan-ng/helm/input';
import { HlmButtonImports } from 'spartan-ng/helm/button';
// Utils
import { SetTokenU } from '@library';
// Aoi's
import { EndpointsService } from '@api';
// Login Form
import { loginForm } from './login.form';
// Environments
import { enviroment } from '@environments';

@Component({
  selector: 'app-login',
  imports: [HlmCardImports, HlmInputImports, HlmButtonImports, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private endpointService = inject(EndpointsService);
  protected readonly loginForm = loginForm();

  protected readonly onSubmit = () => {
    if (this.loginForm.invalid) {
      this.loginForm.markAsUntouched();
      return;
    }

    this.endpointService._endpointC.auth.post
      .login(this.endpointService, this.loginForm.getRawValue())
      .subscribe({
        next: (response: any) => {
          if (response.status === 200 && response.success) {
            const token = response.data?.token;

            if (!token) {
              toast.error('Failed to login, no token found');
              return;
            }

            SetTokenU({
              key: enviroment.tokenKey,
              value: token,
            });
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          console.log('Login error:', error);
          toast.error(error?.message);
        },
      });
  };
}
