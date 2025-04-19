import { Component, Input } from '@angular/core';
import { VwapAlert } from 'src/app/models/vwap/vwap-alert';

@Component({
  selector: 'app-triggered-vwap-alerts-field',
  templateUrl: './triggered-vwap-alerts-field.component.html',
  styleUrls: ['./triggered-vwap-alerts-field.component.css'],
})
export class TriggeredVwapAlertsFieldComponent {
  @Input() alerts!: VwapAlert[];
}
