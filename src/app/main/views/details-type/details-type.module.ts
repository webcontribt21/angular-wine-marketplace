import { NgModule } from '@angular/core';
import { DetailsTypeRoutingModule } from './details-type-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { DetailsTypeComponent } from './container/details-type.component';
import { SecondNavComponent } from './container/dumb/second-nav/second-nav.component';
import { BreadcrumbsComponent } from './container/dumb/breadcrumbs/breadcrumbs.component';
import { ProductListComponent } from './container/smart/product-list/product-list.component';
import { ProductItemComponent } from './container/smart/product-item/product-item.component';
import { FiltersComponent } from './container/smart/product-list/filters/filters.component';
import { FilterListComponent } from './container/smart/product-list/filters/filter-list/filter-list.component';
import { CurrentFiltersComponent } from './container/smart/product-list/current-filters/current-filters.component';
import { WineModule } from '../../header/dumb/nav/views/wines/wine.module';
import { CurrentFilterComponent } from './container/smart/product-list/current-filters/current-filter/current-filter.component';
import { FilterComponent } from './container/smart/product-list/filters/filter-list/filter/filter.component';
import { PriceRangeComponent } from './container/smart/product-list/filters/filter-list/price-range/price-range.component';
import { RatingRangeComponent } from './container/smart/product-list/filters/filter-list/rating-range/rating-range.component';
import { SliderModule } from 'primeng/components/slider/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemsListComponent } from './container/smart/product-list/items-list/items-list.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { SortItemsControlComponent } from './container/smart/product-list/items-list/smart/sort-items-control/sort-items-control.component';
import { SwitcherUnavailableWinesComponent } from './container/smart/product-list/items-list/smart/switcher-unavailable-wines/switcher-unavailable-wines.component';
import { StyleItemsControlComponent } from './container/smart/product-list/items-list/smart/style-items-control/style-items-control.component';
import { AccordionModule } from 'primeng/accordion';
import { PaginatorModule } from 'primeng/paginator';
import { MobileFiltersSelectComponent } from './container/smart/product-list/filters/filter-list/mobile-filters-select/mobile-filters-select.component';

@NgModule({
  declarations: [
    DetailsTypeComponent,
    SecondNavComponent,
    BreadcrumbsComponent,
    ProductListComponent,
    ProductItemComponent,
    FiltersComponent,
    FilterListComponent,
    CurrentFiltersComponent,
    CurrentFilterComponent,
    FilterComponent,
    PriceRangeComponent,
    RatingRangeComponent,
    ItemsListComponent,
    SortItemsControlComponent,
    SwitcherUnavailableWinesComponent,
    StyleItemsControlComponent,
    MobileFiltersSelectComponent
  ],
  exports: [],
  imports: [
    DetailsTypeRoutingModule,
    SharedModule,
    WineModule,
    SliderModule,
    FormsModule,
    InputSwitchModule,
    AutoCompleteModule,
    DropdownModule,
    DialogModule,
    AccordionModule,
    PaginatorModule,
    ReactiveFormsModule
  ]
})
export class DetailsTypeModule {}
