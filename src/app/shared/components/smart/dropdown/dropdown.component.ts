import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Sort } from 'src/app/shared/interfaces/sortBy';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() styleClass: string;
  @Input() showClear: boolean;
  @Input() options: Sort[];
  @Input() placeholder: string;
  @Input() optionLabel: string;
  @Input() sortModel: Sort;
  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    this.valueChange.emit(event.value);
  }

}
