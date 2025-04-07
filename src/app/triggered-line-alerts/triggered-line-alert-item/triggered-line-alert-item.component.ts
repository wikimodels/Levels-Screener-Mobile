import { Component, Input } from '@angular/core';
import { Alert } from 'models/alerts/alert';
import { SelectionService } from 'src/service/selection.service';

@Component({
  selector: 'app-triggered-line-alert-item',
  templateUrl: './triggered-line-alert-item.component.html',
  styleUrls: ['./triggered-line-alert-item.component.css'],
})
export class TriggeredLineAlertItemComponent {
  @Input() item!: Alert;
  selectedItems$ = this.selectionService.selectionChanges$;
  constructor(public selectionService: SelectionService<any>) {}

  ngOnInit(): void {}

  isSelected(item: Alert): boolean {
    return this.selectionService.isSelected(item);
  }

  toggleItem(item: Alert): void {
    this.selectionService.toggle(item);
  }
}
