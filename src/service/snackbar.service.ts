// snackbar.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarType } from 'src/app/models/shared/snackbar-type';
import { HtmlSnackbarComponent } from 'src/app/shared/html-snackbar/html-snackbar.component';

@Injectable({
  providedIn: 'root', // This makes the service available throughout the app
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  // Generic method to show snackbar with dynamic message and action
  showSnackBar(
    message: string,
    action: string = '',
    duration: number = 1000,
    snackbarType: SnackbarType = SnackbarType.Info
  ) {
    // SNACKBAR CSS CLASSES
    // - .warning-snackbar
    // - .info-snackbar
    // - .error-snackbar
    // - .thumb-up-snackbar

    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [snackbarType],
    });
  }

  showThumbUpIcon(duration: number = 7000) {
    this.snackBar.openFromComponent(HtmlSnackbarComponent, {
      data: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 40 40"
  width="48"
  height="48"
>
  <!-- Larger Circle Background -->
  <circle cx="20" cy="20" r="17" fill="black" />

  <!-- Slightly Upward Adjusted Thumb Up Icon -->
  <g transform="translate(7.7 , 6.2) scale(1)">
    <path
      d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32
         c0-.41-.17-.79-.44-1.06L14.17 2 7.59
         8.59C7.22 8.95 7 9.45 7 10v9c0
         1.1.9 2 2 2h9c.83 0 1.54-.5
         1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"
      fill="white"
    />
  </g>
</svg>`,
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['thumb-up-snackbar'],
    });
  }
}
