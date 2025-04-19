import { Component, Input } from '@angular/core';
import { VwapAlert } from 'src/app/models/vwap/vwap-alert';
import { VIBRATIONS } from 'src/consts/url-consts';
import { runVibration } from 'src/functions/run-vibration';
import { SelectionService } from 'src/service/selection.service';

@Component({
  selector: 'app-triggered-vwap-alert-item',
  templateUrl: './triggered-vwap-alert-item.component.html',
  styleUrls: ['./triggered-vwap-alert-item.component.css'],
})
export class TriggeredVwapAlertItemComponent {
  @Input() item!: VwapAlert;
  selectedItems$ = this.selectionService.selectionChanges$;
  constructor(public selectionService: SelectionService<any>) {}

  ngOnInit(): void {}

  isSelected(item: VwapAlert): boolean {
    return this.selectionService.isSelected(item);
  }

  toggleItem(item: VwapAlert): void {
    this.selectionService.toggle(item);
    runVibration(VIBRATIONS.routine);
  }
}
