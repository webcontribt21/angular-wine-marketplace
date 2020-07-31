import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  allCategoriesSelector,
  isLoadingCategoriesSelector
} from 'src/app/@store/story/story.selector';
import { RootState } from 'src/app/@store/reducers/reducers';
import { ResizedEvent } from 'src/app/shared/directives/resized-event';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoriesComponent implements OnInit {
  @ViewChild('navEle', { static: false }) navEle: ElementRef;

  allCategories$: Observable<Object[]> = this.store$.pipe(select(allCategoriesSelector));
  isAllCategories$: Observable<boolean> = this.store$.pipe(select(isLoadingCategoriesSelector));
  navHeight: number;

  constructor(private store$: Store<RootState>) {
  }

  ngOnInit() {
  }

  onResized(event: ResizedEvent) {
    if (event.newHeight !== event.oldHeight) {
      this.navHeight = this.navEle.nativeElement.offsetHeight;
    }
  }
}
