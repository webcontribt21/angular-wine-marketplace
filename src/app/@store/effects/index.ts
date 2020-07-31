import { DataEffect } from './data.effect';
import { WineCategoryEffect } from './wine-category.effect';
import { AuthEffect } from './auth.effect';
import { UserEffect } from './user.effect';
import { NavEffect } from './nav.effect';
import { CountryEffect } from './country.effect';
import { BrandEffect } from './brand.effect';
import { FiltersEffect } from './filters-effect.service';
import { ItemsEffect } from './items.effect';
import { ItemEffect } from './item.effect';
import { QuickSearchEffect } from './quick-search.effect';
import { RouterEffect } from './router.effect';
import { CheckoutEffect } from './checkout.effect';
import { CartEffect } from './cart.effect';
import { HomeEffect } from './home.effect';
import { FooterEffect } from './footer.effect';
import { StoryEffect } from './story.effect';
import { StoryHomeEffect } from './story-home.effect';
import { UserOrderEffect } from './user-order.effect';
import { StorySingleEffect } from './story-single.effect';

export const effects: Array<any> = [
  DataEffect,
  WineCategoryEffect,
  AuthEffect,
  UserEffect,
  NavEffect,
  CountryEffect,
  BrandEffect,
  FiltersEffect,
  ItemsEffect,
  ItemEffect,
  QuickSearchEffect,
  RouterEffect,
  CartEffect,
  CheckoutEffect,
  HomeEffect,
  FooterEffect,
  StoryEffect,
  StoryHomeEffect,
  StorySingleEffect,
  UserOrderEffect
];
