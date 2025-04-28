import { Component } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormOf } from '../../helpers/form-of';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterModule,
} from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

type LoginForm = FormOf<LoginRequest>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup<LoginForm>({
    email: new FormControl(null, [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit():void {
    const loginRequest: LoginRequest = {
      email: this.form.controls.email.value ?? '',
      password: this.form.controls.password.value ?? '',
    };

    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
    });
  }
}

