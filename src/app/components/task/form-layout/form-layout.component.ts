import { Component } from '@angular/core';
import { NewTaskRequest, TaskRequest } from '../../../models/task-request';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsComponent, MenuItem } from '../../../shared/breadcrumbs/breadcrumbs.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormOf } from '../../../helpers/form-of';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../services/task.service';
import { AuthService } from '../../../services/auth.service';
import { Task } from '../../../models/task';
import { CommonModule } from '@angular/common';

type TaskForm = FormOf<TaskRequest>;

@Component({
  selector: 'task-form-layout',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
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
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
})
export default class TaskFormLayoutComponent {
  form = new FormGroup<TaskForm>({
    title: new FormControl(null, [Validators.required, Validators.maxLength(128)]),
    description: new FormControl(null, [Validators.maxLength(500)]),
  });

  taskId: number | null = null;
  editMode = false;
  user: { id: number };

  breadCrumbs: MenuItem[] = [
    { label: 'Home', url: '/home' },
    { label: 'Tasks', url: '/tasks' },
    { label: this.editMode ? 'Edit Task' : 'Add Task' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const taskIdParam = params.get('id');
      if (taskIdParam) {
        this.taskId = +taskIdParam;
        if (this.taskId) {
          this.editMode = true;
          this.loadTaskData(this.taskId);
        }
      }
    });

    this.user = this.authService.getUser();
  }

  loadTaskData(taskId: number) {
    this.taskService.get(taskId).subscribe({
      next: (task) => {
        this.form.patchValue({
          title: task.title,
          description: task.description,
        });
      },
      error: (err) => {
        console.error('Error loading task data:', err);
      },
    });
  }

  submit() {
    const newTaskRequest: NewTaskRequest = {
      title: this.form.controls.title.value ?? '',
      description: this.form.controls.description.value ?? '',
      user_id: this.user.id ?? 0,
    };

    const task: Task = {
      ...newTaskRequest,
      id: this.taskId ?? 0,
      user_name: '',
      status: '',
    };

    if (this.editMode && this.taskId !== null) {
      this.taskService.update(this.taskId, task).subscribe({
        next: () => this.router.navigate(['/tasks']),
      });
    } else {
      this.taskService.create(task).subscribe({
        next: () => this.router.navigate(['/tasks']),
      });
    }
  }
}
