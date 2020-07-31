import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { googleAnalytics, googleAdwords } from '../../../assets/script';
import { environment } from '../../../environments/environment';

@Injectable()
export class AnalyticsService {
  constructor(private router: Router) {}

  track() {
    const url = this.router.url;
    if (url !== null && url !== undefined && url !== '' && url.indexOf('null') < 0) {
      googleAnalytics(url);
    }
  }

  trackEvent(type) {
    googleAdwords(type, {
      send_to: environment.googleAdwordsKey + '/YYYYYYY'
    });
  }
}
