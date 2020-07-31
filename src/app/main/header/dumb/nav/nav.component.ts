import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NAV_URLS, HELP_NAV_URLS } from '../../../../shared/constants';
import { FirstNav, FirstHelpNav } from '../../../../shared/enums';
import { ItemDetailType } from '../../../../shared/interfaces/Item-detail-type.interface';
import { Item } from '../../../../shared/interfaces/item.interface';
import { SortBy } from '../../../../shared/interfaces/sortBy';
import { RootState } from 'src/app/@store/reducers/reducers';
import {
  allCategoriesSelector,
  isLoadingCategoriesSelector
} from 'src/app/@store/story/story.selector';
import * as navActions from 'src/app/@store/nav/nav.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {
  @Input() selectedCategory: string;
  @Input() clickedCategory: string;
  @Input() itemDetailTypes: ItemDetailType[];
  @Input() items: Item[];
  @Input() questionIcon: string;
  @Input() selectRule: SortBy;
  @Input() isSelectNavSection: boolean;
  @Input() isMobile: boolean;
  @Output() toggleCategory$: EventEmitter<string> = new EventEmitter<string>();
  @Output() closeNavMenu$: EventEmitter<any> = new EventEmitter<any>();

  allCategories$: Observable<Object[]> = this.store$.pipe(select(allCategoriesSelector));
  isAllCategories$: Observable<boolean> = this.store$.pipe(select(isLoadingCategoriesSelector));

  links: string[];
  firstNavUrl = FirstNav;
  firstHelpNavUrl = FirstHelpNav;

  constructor(
    private router: Router,
    private store$: Store<RootState>
  ) {
    this.links = [];
  }

  ngOnInit() {
    this.checkSelectedCategory();
  }

  ngOnChanges() {
    this.checkSelectedCategory();
  }

  checkSelectedCategory() {
    this.links = this.selectedCategory === this.firstHelpNavUrl.HELP ?
      HELP_NAV_URLS.links :
      NAV_URLS.links;
  }

  toggle(name: string): void {
    if (this.isMobile) { // mobile view case
      if (name === this.firstNavUrl.WINES && this.selectedCategory !== this.firstNavUrl.WINES) {
        this.router.navigate(['/wines']);
        this.store$.dispatch(navActions.navToggleMobileDropDownMenu());
        return;
      }

      if (name === this.firstNavUrl.STORIES && this.selectedCategory !== this.firstNavUrl.STORIES) {
        this.router.navigate(['/stories/home']);
        this.store$.dispatch(navActions.navToggleMobileDropDownMenu());
        return;
      }

      this.toggleCategory$.emit(name);
    } else {
      if (name === this.firstNavUrl.WINES) {
        this.toggleCategory$.emit(name);
        return;
      }

      this.router.navigate([`/${name}`]);
    }
  }

  toggleMenu() {
    // console.log('test')
    this.store$.dispatch(navActions.navToggleMobileDropDownMenu());
  }

  isActive(name: string): boolean {
    return this.selectedCategory === name;
  }

  isExtend(name: string): boolean {
    return this.clickedCategory === name &&
      this.clickedCategory === this.firstNavUrl.WINES &&
      this.selectedCategory === this.firstNavUrl.WINES;
  }

  closeNavMenu() {
    this.closeNavMenu$.emit();
  }

  help() {
    this.router.navigate(['/help/shipping']);
  }
}
