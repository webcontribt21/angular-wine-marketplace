import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-switcher-unavailable-wines',
  templateUrl: './switcher-unavailable-wines.component.html',
  styleUrls: ['./switcher-unavailable-wines.component.scss']
})
export class SwitcherUnavailableWinesComponent implements OnInit, OnChanges {
  @Input() itemsCount: number = 0;
  @Input() showUnavailableWines: boolean;
  @Output() showUnavailableWines$: EventEmitter<boolean> = new EventEmitter<boolean>();

  showUnavailableWinesInternal: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('showUnavailableWines')) {
      this.showUnavailableWinesInternal = this.showUnavailableWines;
    }
  }

  handleChange(e) {
    this.toggleViewUnavailableWines();
  }

  toggle() {
    this.toggleViewUnavailableWines();
  }

  toggleViewUnavailableWines() {
    this.showUnavailableWines$.emit(this.showUnavailableWines);
  }
}
