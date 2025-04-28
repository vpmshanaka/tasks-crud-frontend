import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import TaskComponent from './components/task/task.component';
import TaskFormLayoutComponent from './components/task/form-layout/form-layout.component';
import { AuthGuard } from './guards/auth.guard'; // Import your AuthGuard

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  // { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'home', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'task/add', component: TaskFormLayoutComponent, canActivate: [AuthGuard] },
  { path: 'task/edit/:id', component: TaskFormLayoutComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' },
];


