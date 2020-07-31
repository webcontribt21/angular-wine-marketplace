
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { RootState } from 'src/app/@store/reducers/reducers';
import * as footerActions from 'src/app/@store/footer/footer.actions';
import {
  footerCol1LinksContentsSelector,
  isLoadingFooterCol1LinksContentsSelector,
  footerCol2LinksContentsSelector,
  isLoadingFooterCol2LinksContentsSelector,
  footerCol3LinksContentsSelector,
  isLoadingFooterCol3LinksContentsSelector,
  footerAboutCopySelector,
  isLoadingFooterAboutCopySelector
} from 'src/app/@store/footer/footer.selector';
import { LinkType } from 'src/app/shared/interfaces/footer';
import {FOOTER_ICONS} from '../../../shared/constants';
import {FooterIcons} from '../../../shared/interfaces/images.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  icons: FooterIcons = FOOTER_ICONS;
  isHidden0: boolean = true;
  isHidden1: boolean = true;
  isHidden2: boolean = true;

  footerCol1LinksContents$: Observable<LinkType[]> = this.store$.pipe(select(footerCol1LinksContentsSelector));
  isfooterCol1LinksContents$: Observable<boolean> = this.store$.pipe(select(isLoadingFooterCol1LinksContentsSelector));

  footerCol2LinksContents$: Observable<LinkType[]> = this.store$.pipe(select(footerCol2LinksContentsSelector));
  isfooterCol2LinksContents$: Observable<boolean> = this.store$.pipe(select(isLoadingFooterCol2LinksContentsSelector));

  footerCol3LinksContents$: Observable<LinkType[]> = this.store$.pipe(select(footerCol3LinksContentsSelector));
  isfooterCol3LinksContents$: Observable<boolean> = this.store$.pipe(select(isLoadingFooterCol3LinksContentsSelector));

  footerAboutCopy$: Observable<Object[]> = this.store$.pipe(select(footerAboutCopySelector));
  isfooterAboutCopy$: Observable<boolean> = this.store$.pipe(select(isLoadingFooterAboutCopySelector));

  constructor(private store$: Store<RootState>) { }

  ngOnInit() {
    this.store$.dispatch(footerActions.loadFooterCol1Links());
    this.store$.dispatch(footerActions.loadFooterCol2Links());
    this.store$.dispatch(footerActions.loadFooterCol3Links());
    this.store$.dispatch(footerActions.loadFooterAboutCopy());


  }

  toggle0() {
    this.isHidden0 = !this.isHidden0;
    // console.log(this)
  }
  toggle1() {
    this.isHidden1 = !this.isHidden1;
    // console.log(this)
  }
  toggle2() {
    this.isHidden2 = !this.isHidden2;
    // console.log(this)
  }

}
