import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FilterData} from '../../../../../../../../../shared/interfaces/filter.interface';

@Component({
  selector: 'app-mobile-filters-select',
  templateUrl: './mobile-filters-select.component.html',
  styleUrls: ['./mobile-filters-select.component.scss']
})
export class MobileFiltersSelectComponent implements OnInit {
  form: FormGroup;

  @Input() data: FilterData[];
  @Output() toggleFilter$: EventEmitter<FilterData> = new EventEmitter<FilterData>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      subFilters: []
    });
  }

  ngOnInit() {
    this.form.controls.subFilters.patchValue(this.data);
  }

  submit() {
    this.toggleFilter$.emit(this.form.value.subFilters);
  }

  trackFilterDataByFn(index, item: FilterData) {
    return item && item.description;
  }
}
