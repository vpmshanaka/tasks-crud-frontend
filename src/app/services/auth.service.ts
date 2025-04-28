import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, NEVER, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SnackBarService } from './utility/snack-bar.service';
import { ApiResponse } from '../helpers/api-response';
import { RegisterRequest } from '../models/register-request';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;  // API URL from environment configuration

  constructor(
    private http: HttpClient,
    private snackbar: SnackBarService
  ) {}

  // Register Method
  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/register`,
      registerRequest,
      { withCredentials: true }
    ).pipe(
      map((response) => {
        if (response.success && response.data) {
          this.persistAuthData(response.data);
          this.snackbar.showInfo(response.message);
          return response.data;
        } else {
          this.snackbar.showError(response.message);
          throw new Error(response.message);
        }
      }),
      catchError((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          `Registration failed, please try again.`;
        
        this.snackbar.showError(errorMessage);
        return NEVER;
      })
    );
  }

  // Login Method
  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/login`,
      loginRequest,
      { withCredentials: true }
    ).pipe(
      map((response) => {
        if (response.success && response.data) {
          this.persistAuthData(response.data);
          this.snackbar.showInfo(response.message);
          return response.data;
        } else {
          this.snackbar.showError(response.message);
          throw new Error(response.message);
        }
      }),
      catchError((error) => {
        const errorMessage =
          error?.error?.message ||
          error?.message ||
          'Login failed, please try again.';
        
        this.snackbar.showError(errorMessage);
        return NEVER;
      })
    );
  }

  // Persist authentication data in localStorage
  persistAuthData(response: any): void {
    localStorage.setItem('token', response.token); // Store the token
    localStorage.setItem('user', JSON.stringify(response.user)); // Store the user data
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getAuthToken() !== null;
  }

  // Logout Method
  logout(): Observable<any> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    ).pipe(
      map((response) => {
        if (response.success) {
          this.clearAuthToken();
          this.snackbar.showInfo(response.message);
          return response.data;
        } else {
          this.snackbar.showError(response.message);
          throw new Error(response.message);
        }
      }),
      catchError((error) => {
        this.snackbar.showError(
          error.message ?? `Logout failed, please try again.`
        );
        return NEVER;
      })
    );
  }

  // Clear Auth Token from localStorage
  clearAuthToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }
  

  // Get Auth Token from localStorage
  getAuthToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');  
    }
    return null;  
  }
  

  // Get User Data from localStorage
  getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      return JSON.parse(localStorage.getItem('user') || '{}'); 
    }
    return {};    
  }
  
}
