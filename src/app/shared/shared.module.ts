import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

// Components
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatButtonModule } from '@angular/material/button';
import { HtmlSnackbarComponent } from './html-snackbar/html-snackbar.component';
import { ButtonsPanelComponent } from './buttons-panel/buttons-panel.component';

@NgModule({
  declarations: [
    SnackbarComponent,
    HtmlSnackbarComponent,
    ButtonsPanelComponent,
  ],
  imports: [
    // Angular Modules
    CommonModule,
    MatButtonModule,
    // Material Modules
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [
    // Components
    SnackbarComponent,
    HtmlSnackbarComponent,
    ButtonsPanelComponent,

    // Modules (only export what's necessary for other modules)
    CommonModule,
    MatButtonModule,
    MatIconModule, // If used in ButtonsPanelComponent or other shared components
  ],
})
export class SharedModule {}
