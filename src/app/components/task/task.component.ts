import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ColDef, GridOptions } from 'ag-grid-community';  
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { suppressKeyboardEvent } from '../../helpers/ag-grid-selection';
import { TaskActionsComponent } from './task-actions-renderer/task-actions.component';
import { CheckboxRendererComponent } from '../../shared/checkbox-renderer/checkbox-renderer.component';

@Component({
  selector: 'task',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    AgGridAngular,
    RouterModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export default class TaskComponent {
  rowData$: Observable<Task[]> | undefined;

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService
  ) {
    this.rowData$ = this.taskService.getAll(); // Fetch task data
  }

  // Column Definitions for AG-Grid
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.5, sort: 'desc' },
    { field: 'title', headerName: 'Title' },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 100 },
    { field: 'user_name', headerName: 'User Name' },
    { field: 'created_at', headerName: 'Created On', flex: 0.75 },
    { field: 'updated_at', headerName: 'Updated On', flex: 0.75 },
    { field: 'status', headerName: 'status', flex: 0.75 },
    {
      field: 'status',
      headerName: 'Completed',
      headerTooltip: 'Completed',
      flex: 0.5,
      suppressKeyboardEvent,
      cellRenderer: CheckboxRendererComponent<Task>,
      cellRendererParams: {
        label: 'Click to toggle task status.',
        action: (data: Task) => this.checkCompleted(data),
        value: (data: Task) => (data?.status === 'completed' ? true : false),
      },
    },
    {
      headerName: 'Actions',
      headerTooltip: 'Actions',
      sortable: false,
      filter: false,
      flex: 0.5,
      minWidth: 50,
      suppressKeyboardEvent,
      cellRenderer: TaskActionsComponent,
      cellRendererParams: {
        actionLabel: () => 'Open actions menu.',
        icon: 'fa-solid fa-ellipsis',
      },
    },
  ];

  // Grid Options Configuration
  gridOptions: GridOptions<Task> = {
    columnDefs: this.columnDefs,
    rowModelType: 'clientSide', // Use client-side row model
    suppressLoadingOverlay: true,
    pagination: true,
    paginationPageSize: 25,
    paginationPageSizeSelector: [25, 50, 100],
    defaultColDef: {
      sortable: true,
      resizable: true,
      flex: 1,
      filter: true,
    },
  };

  // Toggle task status between "completed" and "pending"
  checkCompleted(task: Task) {
    if (task) {
      const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';
      const updatedTask: Task = { ...task, status: updatedStatus };
      this.taskService.update(task.id, updatedTask).subscribe();
    }
  }
}
