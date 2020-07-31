import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent implements OnInit {
  @Input() countRowsPerPage: number;
  @Input() totalRecords: number;
  @Input() pageLinkSize: number;
  @Input() first: number;
  @Input() styleClass: string;
  @Output() paginate = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPageChange(event: Object) {
    this.paginate.emit(event);
  }

}
