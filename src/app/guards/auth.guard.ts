import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Import AuthService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Check if the user is authenticated
    if (this.authService.isAuthenticated()) {
      return new Observable<boolean>((observer) => observer.next(true));  // Allow access to route
    } else {
      // Redirect to login page with returnUrl (target route)
      // this.router.navigate(['/login'], {
      //   queryParams: { returnUrl: state.url },  // Save the target route
      // });
      return new Observable<boolean>((observer) => observer.next(false));  // Block access
    }
  }
}



