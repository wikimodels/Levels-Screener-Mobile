import { Component, Input } from '@angular/core';
import { Alert } from 'src/app/models/alerts/alert';

@Component({
  selector: 'app-triggered-line-alerts-field',
  templateUrl: './triggered-line-alerts-field.component.html',
  styleUrls: ['./triggered-line-alerts-field.component.css'],
})
export class TriggeredLineAlertsFieldComponent {
  @Input() alerts!: Alert[];
}
