import {
  Component,
  HostListener,
  Inject,
  Input,
  SimpleChanges,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tw-images',
  templateUrl: './tw-images.component.html',
  styleUrls: ['./tw-images.component.css'],
})
export class TwImagesComponent {
  // @Input() imageLinks: string[] = [];
  // @Input() imageUrls: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public imageUrls: string[],
    public dialogRef: MatDialogRef<TwImagesComponent>
  ) {}
  // Loading state management
  imageLoaded = false;
  currentIndex = 0;
  private _currentImageId = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imageUrls']) {
      this.resetLoadingState();
      this.currentIndex = 0;
    }
  }

  get currentImage(): string | null {
    return this.imageUrls[this.currentIndex] || null;
  }

  nextImage() {
    if (this.currentIndex < this.imageUrls.length - 1) {
      this.currentIndex++;
      this.resetLoadingState();
    }
  }

  previousImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.resetLoadingState();
    }
  }

  onImageLoad() {
    this.imageLoaded = true;
    this._currentImageId = performance.now(); // Unique identifier for current image
  }

  resetLoadingState() {
    this.imageLoaded = false;
    this._currentImageId = performance.now();
  }

  // Prevent showing old image while new one is loading
  trackImageId(index: number): number {
    return this._currentImageId;
  }
}
