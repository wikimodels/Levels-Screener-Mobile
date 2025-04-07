import { Component, Input, OnInit } from '@angular/core';
import { Alert } from 'models/alerts/alert';
import { VwapAlert } from 'models/vwap/vwap-alert';
import { CoinLinksService } from 'src/service/coin-links.service';
import { SelectionService } from 'src/service/selection.service';

type CombinedAlert = Alert;

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.css'],
})
export class WorkItemComponent implements OnInit {
  @Input() item!: CombinedAlert;
  selectedItems$ = this.selectionService.selectionChanges$;
  constructor(
    public selectionService: SelectionService<any>,
    public coinsLinksService: CoinLinksService
  ) {}

  ngOnInit(): void {}

  isSelected(item: CombinedAlert): boolean {
    return this.selectionService.isSelected(item);
  }

  toggleItem(item: CombinedAlert): void {
    this.selectionService.toggle(item);
  }
}
