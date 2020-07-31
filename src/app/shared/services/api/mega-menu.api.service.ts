import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  megaMenuFeaturedWinesGQL,
} from '../../../graphql/queries';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MegaMenuApiService {

  constructor(private apollo: Apollo) { }

  getHomeFeaturedWinesData(): Observable<any> {
    return this.apollo
      .query({
        query: megaMenuFeaturedWinesGQL
      })
      .pipe(
        map(result => (result.data['SiteContentBlocks'][0] && result.data['SiteContentBlocks'][0]['siteContentBlockDetail']) || []
      )
    );
  }
}
