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

import { MatButtonModule } from '@angular/material/button';
import { DescriptionComponent } from './description.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DescriptionRoutingModule } from './description-routing.module';
import { SwiperModule } from 'swiper/angular';
import { ZoomViewerComponent } from './zoom-viewer/zoom-viewer.component';

@NgModule({
  declarations: [DescriptionComponent, CarouselComponent, ZoomViewerComponent],
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
    DescriptionRoutingModule,
    // Swiper (v8)
    SwiperModule,
  ],
  exports: [
    // Components
    DescriptionComponent,
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
    SwiperModule,
  ],
})
export class DescriptionModule {}
