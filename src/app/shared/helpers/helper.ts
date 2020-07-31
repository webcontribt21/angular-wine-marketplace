import { KEYS_OF_TYPES, UNIQUE_KEYS_FOR_SEARCH_ITEMS } from '../constants';
import { ItemDetailTypeValue } from '../interfaces/item-detail-type-value.interface';
import { ItemDetailType } from '../interfaces/Item-detail-type.interface';
import { DataFacet, Facet, ValueFacet } from '../interfaces/facet.interface';
import { cloneDeep, orderBy, isUndefined } from 'lodash';
import { Country } from '../interfaces/country.interface';
import { Brand } from '../interfaces/brands.interface';
import { Filter, FilterData } from '../interfaces/filter.interface';
import { Item } from '../interfaces/item.interface';
import { SupplierItem } from '../interfaces/supplier-item.intefrace';
import { Supplier } from '../interfaces/supplier.interface';

export class Helper {
  static getFacetName(itemDetailTypeNo: number): string {
    return UNIQUE_KEYS_FOR_SEARCH_ITEMS.facets.name + itemDetailTypeNo;
  }

  static createNewItemDetailTypeValue(description: string): ItemDetailTypeValue {
    const itemDetailTypeValue = {
      _id: '',
      description,
      imageUrl: '',
      itemDetailType_id: '',
      sortRanking: '',
      status: true,
      count: 0,
      routeKey: null
    };
    return itemDetailTypeValue;
  }

  static setCountForItemDetailTypeValue(itemDetailTypes: ItemDetailType[], facets: Facet[]): ItemDetailType[] {
    const newItemDetailTypes = cloneDeep(itemDetailTypes);

    newItemDetailTypes.forEach(foundItem => {
      const nameForFacets: string = Helper.getFacetName(foundItem.itemDetailTypeNo);
      const facet = facets.find((facet: Facet) => facet.name.toLowerCase() === nameForFacets.toLowerCase());

      // console.log('foundItem | facet', { foundItem, facet });

      if (facet) {
        const { value: values } = facet;
        const valueFacet = values.find((dataFacet: ValueFacet) => dataFacet.type.toLowerCase() === 'value');

        if (valueFacet) {
          const { data } = valueFacet;

          foundItem.itemDetailTypeValues.forEach((itemDetailTypeValue: ItemDetailTypeValue) => {
            const foundsDataFacet = data.find(
              (dataFacet: DataFacet) =>
                dataFacet.value.toLowerCase() === itemDetailTypeValue.description.toLowerCase()
            );

            itemDetailTypeValue.count = foundsDataFacet ? foundsDataFacet.count : 0;
          });
        }
      }
    });

    return newItemDetailTypes;
  }

  static setCountToCountries(countries: Country[], facets: Facet[]): Country[] {
    const newCountries = cloneDeep(countries);
    const nameForFacets: string = 'country';
    const facet: Facet = facets.find((facet: Facet) => facet.name.toLowerCase() === nameForFacets.toLowerCase());

    if (facet) {
      const { value: values } = facet;
      const valueFacet = values.find((dataFacet: ValueFacet) => dataFacet.type.toLowerCase() === 'value');

      if (valueFacet) {
        const { data } = valueFacet;

        newCountries.forEach((country: Country) => {
          const foundsDataFacet = data.find((dataFacet: DataFacet) => dataFacet.value.toLowerCase() === country.name.toLowerCase());

          country.count = foundsDataFacet ? foundsDataFacet.count : 0;
        });
      }
    }

    return newCountries;
  }

  static setCountToBrands(brands: Brand[], facets: Facet[]): Brand[] {
    const newBrands = cloneDeep(brands);
    const nameForFacets: string = 'brand';
    const facet: Facet = facets.find((facet: Facet) => facet.name.toLowerCase() === nameForFacets.toLowerCase());

    if (facet) {
      const { value: values } = facet;
      const valueFacet = values.find((dataFacet: ValueFacet) => dataFacet.type.toLowerCase() === 'value');

      if (valueFacet) {
        const { data } = valueFacet;

        newBrands.forEach((brand: Brand) => {
          const foundsDataFacet = data.find((dataFacet: DataFacet) => dataFacet.value.toLowerCase() === brand.name.toLowerCase());

          brand.count = foundsDataFacet ? foundsDataFacet.count : 0;
        });
      }
    }

    return newBrands;
  }

  static setCountToFilters(vendorFilters: Supplier[], facets: Facet[]): Supplier[] {
    const newVendorFilters = cloneDeep(vendorFilters);
    const nameForFacets: string = 'price_zar_supplierid';
    const facet: Facet = facets.find(
      (facet: Facet) => facet.name.toLowerCase() === nameForFacets.toLowerCase()
    );

    if (facet) {
      const { value: values } = facet;
      const valueFacet = values.find((dataFacet: ValueFacet) => dataFacet.type.toLowerCase() === 'value');

      if (valueFacet) {
        const { data } = valueFacet;

        newVendorFilters.forEach((vendorFilter: Supplier) => {
          const foundsDataFacet = data.find(
            (dataFacet: DataFacet) => dataFacet.value === vendorFilter._id
          );

          vendorFilter.count = foundsDataFacet ? foundsDataFacet.count : 0;
        });
      }
    }

    return newVendorFilters;
  }

  static addAllSection(type: string, description: string, itemDetailTypes: ItemDetailType[], facets: Facet[]): ItemDetailType[] {
    const newItemDetailTypes = cloneDeep(itemDetailTypes);

    newItemDetailTypes.forEach(foundItem => {
      if (foundItem.description.toLowerCase() === type) {
        const newItemDetailTypeValue = Helper.createNewItemDetailTypeValue(description);
        let count = 0;

        facets = facets.filter(f => f.name === 'detail_3');

        facets.forEach(({ value }) => {
          value.forEach(({ data }) => {
            data.forEach(data => (count += data.count));
          });
        });

        newItemDetailTypeValue.count = count;
        foundItem.itemDetailTypeValues = [newItemDetailTypeValue, ...foundItem.itemDetailTypeValues];
      }
    });

    return newItemDetailTypes;
  }

  static foundItemDetailsType(allCategories: ItemDetailType[] = [], key: string): any[] {
    const __allCategories = cloneDeep(allCategories);
    const result = [];

    if (KEYS_OF_TYPES.hasOwnProperty(key) && Array.isArray(KEYS_OF_TYPES[key])) {
      const __keys: string[] = KEYS_OF_TYPES[key];
      const categories_tmp = __allCategories.filter((item: ItemDetailType) => __keys.includes(item.description.toLowerCase()));
      const categories = orderBy(categories_tmp, ['description'], ['desc']);

      return categories;
    } else {
      console.warn("foundItemDetailsType: KEYS_OF_TYPES hasn't property " + key);
    }

    return result;
  }

  static convertDataToFilter(
    itemDetailTypes: ItemDetailType[],
    countries: Country[],
    brands: Brand[],
    vendors: Supplier[],
    filters1: Filter[]
  ): Filter[] {
    const defaultFiltersExpanded =
      (filters1 && filters1.filter(f => f.isPanelOpen).map(m => m.title.toLowerCase())) || ['type', 'countries'];
    const filters: Filter[] = [];

    itemDetailTypes.forEach(item => {
      const isPanelOpen = defaultFiltersExpanded.indexOf(item.description.toLowerCase()) !== -1;
      const filter = new Filter(item.description, [], item.itemDetailTypeNo, isPanelOpen);

      item.itemDetailTypeValues.forEach(itemDetailTypeValue => {
        const filterData = new FilterData(
          itemDetailTypeValue.description,
          item.description,
          itemDetailTypeValue.count,
          item.itemDetailTypeNo,
        );
        filter.data.push(filterData);
      });

      if (item.sortFilterValuesByCount === true) {
        filter.data = filter.data.sort((a, b) => b.count - a.count);
      }

      filters.push(filter);
    });

    const isCountriesPanelOpen = defaultFiltersExpanded.indexOf('countries') !== -1;
    const countriesFilter = new Filter('Countries', [], null, isCountriesPanelOpen);

    countries.forEach(country => {
      const filterData = new FilterData(country.name, 'Country', country.count);
      countriesFilter.data.push(filterData);
    });

    filters.push(countriesFilter);

    const isBrandsPanelOpen = defaultFiltersExpanded.indexOf('brands') !== -1;
    const brandsFilter = new Filter('Brands', [], null, isBrandsPanelOpen);

    brands.forEach(brand => {
      const filterData = new FilterData(brand.name, 'Brand', brand.count);
      brandsFilter.data.push(filterData);
    });

    filters.push(brandsFilter);

    const isVendorsPanelOpen = defaultFiltersExpanded.indexOf('vendors') !== -1;
    const vendorsFilter = new Filter('Vendors', [], null, isVendorsPanelOpen);

    vendors.forEach(vendor => {
      const filterData =
        new FilterData(vendor.name, 'Supplier', vendor.count, null, 'price_zar_supplierid', vendor._id);
      vendorsFilter.data.push(filterData);
    });

    filters.push(vendorsFilter);

    return filters;
  }

  static setPriceToItem(items: Item[]): Item[] {
    const _items: Item[] = cloneDeep(items);
    let supplier;

    if (_items) {
      return _items.map((item: Item) => {
        if (item.suppliers.length > 1) {
          supplier = item.suppliers.reduce((prev, curr) => {
            return (!!prev.price ? prev.price : 0) < (!!curr.price ? curr.price : 0) ? curr : prev;
            if ((!!prev.price ? prev.price : 0) === (!!curr.price ? curr.price : 0)) return curr;
          });
        } else {
          supplier = item.suppliers[0];
        }

        if (isUndefined(supplier)) {
          supplier = new SupplierItem();
        }

        supplier.stockQty = !!supplier.stockQty ? supplier.stockQty : 0;

        item['supplier'] = supplier;
        item['price'] = !!supplier.price ? supplier.price : 100;

        return item;
      });
    }

    return [];
  }
}
