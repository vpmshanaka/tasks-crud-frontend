import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Adjust path if needed

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService); // Inject properly here

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();

    if (token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}

