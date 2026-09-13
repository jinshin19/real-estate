// Angular Imports
import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientCommonOptions, HttpResponse } from '@angular/common/http';
// Utils
import { GetTokenU } from '../../utils';
// Interfaces
import type { ApiPaginatedResponseI, ApiResponseI } from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly defaultOptions: HttpClientCommonOptions = {
    withCredentials: true,
  };

  constructor(private readonly httpClient: HttpClient) {}

  onList<T>({
    url,
    options,
  }: ApiRequestI): Observable<HttpResponse<ApiResponseI<ApiPaginatedResponseI<T>>>> {
    const accessToken = GetTokenU({});

    return this.httpClient
      .get<ApiResponseI<ApiPaginatedResponseI<T>>>(url, {
        ...this.defaultOptions,
        ...options,
        observe: 'response',
        responseType: 'json',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  onPost<T>({ url, body, options }: OnPostI): Observable<ApiResponseI<T>> {
    const accessToken = GetTokenU({});

    return this.httpClient
      .post<ApiResponseI<T>>(url, body, {
        ...this.defaultOptions,
        ...options,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        catchError((error) => {
          console.log('Error:', error);
          throw error;
        }),
      );
  }
}

interface ApiRequestI {
  url: string;
  options?: HttpClientCommonOptions;
}

interface OnPostI extends ApiRequestI {
  body: any;
}
