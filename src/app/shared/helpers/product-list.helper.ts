import { Filter, FilterData } from '../interfaces/filter.interface';
import { isUndefined } from 'lodash';
import { UrlFriendlyPipe } from '../pipes/url-friendly.pipe';

export class ProductListHelper {
  static getCustomFiltersFromRoute(filters: Filter[], segments: string[]):
    { customFilters: FilterData[], ratingRangeValues: number[], priceRangeValues: number[], showUnavailableWines: boolean } {
    const availableFilters = this.filtersSortedBySequence(filters);
    const urlFriendly = new UrlFriendlyPipe();
    let ratingRangeValues: number[] = null;
    let priceRangeValues: number[] = null;
    let showUnavailableWines = false;

    const combinedCustomFilters: FilterData[] = segments.map(segment => {
      if (segment.toLowerCase().startsWith('rating-')) {
        try {
          ratingRangeValues = segment.substring(7).split('-').map(m => +m).filter(f => !isNaN(f));
          if (ratingRangeValues.length < 2) {
            ratingRangeValues = null;
          }
        } catch (error) {
        }
      } else if (segment.toLowerCase().startsWith('price-')) {
        try {
          priceRangeValues = segment.substring(6).split('-').map(m => +m).filter(f => !isNaN(f));
          if (priceRangeValues.length < 2) {
            priceRangeValues = null;
          }
        } catch (error) {
        }
      } else if (segment.toLowerCase() === 'include-unavailable') {
        showUnavailableWines = true;
      } else {
        const targetSegment = segment.toLowerCase().startsWith('vendor-') ?
          segment.substring(7) :
          segment;
        const availableFilter = availableFilters.find(f => {
          return f.data.find(f1 => {
            return urlFriendly.transform(f1.description.toLowerCase()) === targetSegment;
          });
        });
        if (availableFilter) {
          const filterdata = availableFilter.data.find(f1 => urlFriendly.transform(f1.description.toLowerCase()) === targetSegment);

          // availableFilters = availableFilters.filter(f => f.title !== availableFilter.title);
          return {
            description: filterdata.description,
            parent: filterdata.parent,
            count: filterdata.count,
            parentTypeNo: availableFilter.typeNo,
            filterName: filterdata.filterName,
            filterValue: filterdata.filterValue
          };
        }
      }
    }).filter(f => !!f);

    return {
      customFilters: combinedCustomFilters,
      ratingRangeValues,
      priceRangeValues,
      showUnavailableWines
    };
  }

  static getRouteFromCustomFilters(
      filters: Filter[],
      customFilters: FilterData[],
      ratingRangeValues: number[],
      priceRangeValues: number[],
      showUnavailableWines: boolean
    ): string {
    const urlFriendly = new UrlFriendlyPipe();
    const segments = ['wines', ...customFilters.map(m => {
      if (m.filterName) {
        return urlFriendly.transform(`vendor-${m.description}`);
      }

      return urlFriendly.transform(m.description);
    })];

    if (ratingRangeValues) {
      segments.push(`rating-${ratingRangeValues[0]}-${ratingRangeValues[1]}`);
    }
    if (priceRangeValues) {
      segments.push(`price-${priceRangeValues[0]}-${priceRangeValues[1]}`);
    }
    if (showUnavailableWines) {
      segments.push('include-unavailable');
    }
    return segments.join('/');
  }

  static filtersSortedBySequence(filters: Filter[]): Filter[] {
    return [...filters].sort((a: Filter, b: Filter) => this.filterSequence(a) - this.filterSequence(b));
  }

  static filterSequence(filter: Filter): number {
    switch (filter.title.toLowerCase()) {
      case 'type': return 0;
      case 'countries': return 1;
      case 'region': return 2;
      case 'cultivar': return 3;
      case 'appellation': return 4;
      case 'vintage': return 5;
      case 'brands': return 6;
      case 'food pairing tags': return 7;
      case 'bottle size': return 8;
      case 'vendors': return 9;
    }
    return 99;
  }

  static getFilterFromRoute(filters: Filter[], props): FilterData {
    // const emptyFilter = new FilterData('', '', 0, 0);

    console.log('ProductListHelper => ', props);

    if (
      props.hasOwnProperty('description') &&
      !isUndefined(props.description) &&
      props.hasOwnProperty('type') &&
      !isUndefined(props.type)
    ) {
      const findFilter = filters.find(filter => {
        if (!isUndefined(filter)) {
          return filter.title.toLowerCase() === props.type.toLowerCase();
        }
      });

      if (!isUndefined(findFilter)) {
        const filterData = findFilter.data.find(fData => {
          if (!isUndefined(findFilter)) {
            const filterDataDescriptionTransformed = new UrlFriendlyPipe().transform(fData.description);
            // console.log(filterDataDescriptionTransformed.toLowerCase() + ' << ' + props.description.toLowerCase());

            // return filterData.description.toLowerCase() === props.description.toLowerCase();
            return filterDataDescriptionTransformed.toLowerCase() === props.description.toLowerCase();
          }
        });

        console.log('filter', { findFilter, filterData });

        if (!isUndefined(filterData)) {
          return filterData;
        } else {
          console.log(
            'should be removed?',
            'new FilterData(props.description.toLowerCase(), findFilter.title.toLowerCase(), 0, findFilter.typeNo)'
          );
          return new FilterData(props.description.toLowerCase(), findFilter.title.toLowerCase(), 0, findFilter.typeNo);
        }
      }
    }

    return null;
  }
}
