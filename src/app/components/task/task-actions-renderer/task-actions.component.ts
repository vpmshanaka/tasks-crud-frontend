import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { RouterModule } from '@angular/router';
import { Task } from '../../../models/task';
import { TaskService } from '../../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDeleteDialogComponent,
  ConfirmDeleteParams,
} from '../../../shared/confirm-delete-dialog/confirm-delete-dialog.component';
import { filter, switchMap, take } from 'rxjs';

export interface TaskActionsRendererParams
  extends ICellRendererParams<Task, unknown, void> {
  actionLabel: (value: Task) => string;
  icon: string;
  disabled?: (data: Task) => boolean;
}

@Component({
  selector: 'task-actions',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.scss'],
})
export class TaskActionsComponent implements ICellRendererAngularComp {
  actionLabel = 'open the actions menu.';
  icon = 'fa-regular fa-ellipsis';
  task!: Task;
  disabled = false;
  private params!: TaskActionsRendererParams;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  agInit(params: TaskActionsRendererParams): void {
    this.setValuesBasedOnParams(params);
  }

  refresh(params: TaskActionsRendererParams): boolean {
    this.setValuesBasedOnParams(params);
    return true;
  }

  private setValuesBasedOnParams(params: TaskActionsRendererParams) {
    this.params = params;
    if (params.data) {
      this.actionLabel = this.params.actionLabel(params.data);
      this.icon = this.params.icon;
      this.task = params.data;
      this.disabled = this.params.disabled?.(params.data) || false;
    }
  }

  confirmDeleteTask(data: Task) {
    const id = data.id;
    const title = data.title;

    if (title) {
      this.dialog
        .open<ConfirmDeleteDialogComponent, ConfirmDeleteParams, boolean>(
          ConfirmDeleteDialogComponent,
          {
            data: { id, title },
            panelClass: 'ot-dialog-8',
          }
        )
        .afterClosed()
        .pipe(
          take(1),
          filter((result) => !!result),
          switchMap(() => this.taskService.delete(id))
        )
        .subscribe();
    }
  }
}
