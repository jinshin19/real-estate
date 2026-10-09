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
  private readonly defaultOptions: ApiHttpOptionsI = {
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

  onGet<T>({ url, options }: ApiRequestI): Observable<ApiResponseI<T>> {
    const accessToken = GetTokenU({});

    return this.httpClient
      .get<ApiResponseI<T>>(url, {
        ...this.defaultOptions,
        ...options,
        observe: 'body',
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

  onPostForm<T>({ url, body, options }: OnPostI): Observable<ApiResponseI<T>> {
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

  onPatch<T>({ url, body, options }: OnPatchI): Observable<ApiResponseI<T>> {
    const accessToken = GetTokenU({});

    return this.httpClient
      .patch<ApiResponseI<T>>(url, body, {
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

  onDelete<T>({ url, options }: ApiRequestI): Observable<ApiResponseI<T>> {
    const accessToken = GetTokenU({});

    return this.httpClient
      .delete<ApiResponseI<T>>(url, {
        ...this.defaultOptions,
        ...options,
        observe: 'body',
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
}

type ApiHttpOptionsI = Omit<HttpClientCommonOptions, 'observe' | 'responseType'>;

interface ApiRequestI {
  url: string;
  options?: ApiHttpOptionsI;
}

interface OnPostI extends ApiRequestI {
  body: any;
}

interface OnPatchI extends ApiRequestI {
  body: any;
}
