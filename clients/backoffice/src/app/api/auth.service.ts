// Angular Imports
import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Api
import { BASE_URL } from './api';

@Service()
export class AuthService {
  private url = `${BASE_URL}/auth/login`;
  private http = inject(HttpClient);

  public login(payload: LoginPayloadI) {
    return this.http.post(this.url, payload);
  }
}

interface LoginPayloadI {
  email: string;
  password: string;
}
