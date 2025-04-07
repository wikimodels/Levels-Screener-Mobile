import { Component, Input, OnInit } from '@angular/core';
import { Alert } from 'models/alerts/alert';
type CombinedAlert = Alert;

@Component({
  selector: 'app-coins-field',
  templateUrl: './coins-field.component.html',
  styleUrls: ['./coins-field.component.css'],
})
export class CoinsFieldComponent implements OnInit {
  @Input() alerts!: CombinedAlert[];
  constructor() {}
  ngOnInit(): void {}
}
