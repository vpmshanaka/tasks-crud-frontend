import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { inject } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AuthService } from './app/services/auth.service';
import { appRoutes } from './app/app.routes'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const authService = inject(AuthService);
          const token = authService.getAuthToken();

          if (token) {
            const clonedRequest = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next(clonedRequest);
          }
          return next(req);
        }
      ])
    ),
    provideRouter(appRoutes) 
  ]
});


