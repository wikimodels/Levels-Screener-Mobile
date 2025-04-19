import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.css'],
})
export class GoogleButtonComponent {
  @Output() onClick = new EventEmitter<void>();
}
