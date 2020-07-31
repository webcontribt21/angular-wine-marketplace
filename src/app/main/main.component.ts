import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';

import { RootState } from '../@store/reducers/reducers';
import * as navActions from 'src/app/@store/nav/nav.actions';
import * as articleActions from 'src/app/@store/story/story.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements AfterViewInit {
  @ViewChild('headEle', { static: false }) headEle: ElementRef;
  @ViewChild('subscriptionEle', { static: false }) subscriptionEle: ElementRef;
  @ViewChild('footerEle', { static: false }) footerEle: ElementRef;

  mainMinHeight: number;

  constructor(
    private _router: Router,
    private store$: Store<RootState>,
    private _cdr: ChangeDetectorRef
  ) {
    this.mainMinHeight = 0;

    this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const paths = event.url.split('/');
        this.store$.dispatch(navActions.navClickCategory({ name: paths[1] }));
      }
    });

    this.store$.dispatch(articleActions.loadStoryAllCategories());
  }

  ngAfterViewInit() {
    this.calculateMainMinHeight();
  }

  calculateMainMinHeight() {
    this.mainMinHeight = window.innerHeight
      - this.headEle.nativeElement.offsetHeight
      - this.subscriptionEle.nativeElement.offsetHeight
      - this.footerEle.nativeElement.offsetHeight
      + 110;
    this.mainMinHeight = this.mainMinHeight > 0 ? this.mainMinHeight : 0;
    this._cdr.detectChanges();
  }

  onResized() {
    this.calculateMainMinHeight();
  }
}

