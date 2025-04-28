import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  user: { name: string } = { name: 'Guest' };
  userInitial: string = 'A';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = this.authService.getUser();
    this.userInitial = this.setUserInitial();
  }

  setUserInitial(): string {
    if (this.user && this.user.name) {
      return this.user.name.charAt(0).toUpperCase();  // Return the first capital letter
    }
    return '';  
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']), 
    });
  }
}
