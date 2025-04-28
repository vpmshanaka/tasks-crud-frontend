import { Component } from '@angular/core';
import { RegisterRequest } from '../../models/register-request';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormOf } from '../../helpers/form-of';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';

type RegisterForm = FormOf<RegisterRequest>;

function passwordMatchValidator(control: AbstractControl) {
  const password = control.root?.get('password')?.value;
  const confirmPassword = control.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup<RegisterForm>({
    name: new FormControl(null, [
      Validators.required
    ]),
    email: new FormControl(null, [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    password_confirmation: new FormControl(null, [
      Validators.required,
      passwordMatchValidator
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  // Handle form submission
  onSubmit(): void {
    if (this.form.invalid) return;

    const registerRequest: RegisterRequest = {
      name: this.form.controls.name.value ?? '',
      email: this.form.controls.email.value ?? '',
      password: this.form.controls.password.value ?? '',
      password_confirmation: this.form.controls.password_confirmation.value ?? '',
    };

    this.authService.register(registerRequest).subscribe({
      next: () => {
        this.router.navigate(['/home']); // Redirect to home
      }
    });
  }
}
