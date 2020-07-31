// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiPath: 'https://-staging-api.herokuapp.com/graphql',
  // tslint:disable-next-line:max-line-length
  shopToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjMwOWQ0MjlhOWNiMDAwNGRmZWJmYyIsImlhdCI6MTU3MjAxNDU0OH0.o6ANRwAw5rueTho3RN9eFLYSa2HkPt3gknbc1EzPFQM',
  shopId: '5db309d429a9cb0004dfebfc',
  googleAnalyticsKey: 'UA-XXXX',
  googleAdwordsKey: 'NOTSET',
  googleApiKey: 'AIzaSyAI1-7gFfNzZTqedVO8-Sksgim5YqwP4gQ'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
