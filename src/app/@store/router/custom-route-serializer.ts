import { Params, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  segments: string[];
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;

    const currentParams = route.params;
    const parentParams = searchParent(route.parent);

    const params = {
      ...parentParams,
      ...currentParams
    };

    const segments = route.url.map(m => m.path);

    return { url, params, queryParams, segments };
  }
}

const searchParent = parent => {
  let params = {};

  const getParams = parent => {
    if (parent && parent.parent) {
      if (Object.keys(parent.params).length) {
        params = { ...parent.params, ...params };
      } else {
        if (parent.routeConfig.path.length) {
          params = { path: parent.routeConfig.path, ...params };
        }
      }
      getParams(parent.parent);
    }

    return params;
  };

  return getParams(parent);
};
