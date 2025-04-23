import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { TextFieldModule } from '@angular/cdk/text-field';

// Components
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatButtonModule } from '@angular/material/button';
import { HtmlSnackbarComponent } from './html-snackbar/html-snackbar.component';

@NgModule({
  declarations: [SnackbarComponent, HtmlSnackbarComponent],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material Modules
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    TextFieldModule,
  ],
  exports: [
    // Components
    SnackbarComponent,
    HtmlSnackbarComponent,
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    TextFieldModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
