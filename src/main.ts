import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { googleAnalyticsHeadScripts, facebookSDKScripts } from './assets/script';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

googleAnalyticsHeadScripts();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
