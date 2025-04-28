import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from './shared/header/header.component';

import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service'; 
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatFormFieldModule,  // For mat-form-field and mat-error
    MatInputModule,      // For matInput
    MatButtonModule,     // For mat-raised-button
    MatCardModule,       // For mat-card
    // SidenavComponent,
    HeaderComponent,
    CommonModule,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-material-crud';

  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {
    // Subscribe to navigation events to check the authentication status
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Check if the user is authenticated
        this.isAuthenticated = this.authService.isAuthenticated();  // Check if the user is authenticated

        
      });
  }
}
