import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  TRIGGERED_LINE_ALERTS,
  TRIGGERED_VWAP_ALERTS,
  VIBRATIONS,
} from 'src/consts/url-consts';
import { runVibration } from 'src/functions/run-vibration';

@Component({
  selector: 'app-alert-menu',
  templateUrl: './alert-menu.component.html',
  styleUrls: ['./alert-menu.component.css'],
})
export class AlertMenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToTriggeredLineAlerts() {
    this.router.navigate([TRIGGERED_LINE_ALERTS]);
  }

  goToVwapTriggeredAlerts() {
    this.router.navigate([TRIGGERED_VWAP_ALERTS]);
  }

  selectedAlert = 'Triggered Line Alerts'; // Default text [[1]][[4]]

  // Method to update selected alert text
  selectAlert(alertType: string): void {
    this.selectedAlert = alertType;
    // Add navigation logic based on alertType [[3]][[10]]
    if (alertType === 'Triggered Vwap Alerts') {
      this.goToVwapTriggeredAlerts();
      runVibration(VIBRATIONS.routine);
    } else if (alertType === 'Triggered Line Alerts') {
      this.goToTriggeredLineAlerts();
      runVibration(VIBRATIONS.routine);
    }
  }
}
