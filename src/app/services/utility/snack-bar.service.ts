import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { fromEvent, Subscription } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  private _snackbar!: MatSnackBarRef<any>;
  private click!: Subscription;

  showError(message: string, duration: number = 3000) {
    this._snackbar = this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snack-bar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.dismissOnAnyClick();
  }

  showInfo(message: string, duration: number = 5000) {
    this._snackbar = this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snack-bar-info'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    this.dismissOnAnyClick();
  }

  private dismissOnAnyClick() {
    if (!this._snackbar) {
      return;
    }

    this._snackbar.afterOpened().subscribe(() => {
      this.click = fromEvent<MouseEvent>(document, 'click')
        .pipe(takeUntil(this._snackbar.afterDismissed()))
        .subscribe((event) => {
          this._snackbar.dismiss();
        });
    });
  }
}
