// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCye_nC8c9v0vtCPJcGppH01sgRZ2lzzVU',
    authDomain: 'lmsapp-4a7c5.firebaseapp.com',
    databaseURL: 'https://lmsapp-4a7c5.firebaseio.com',
    projectId: 'lmsapp-4a7c5',
    storageBucket: 'lmsapp-4a7c5.appspot.com',
    messagingSenderId: '249237162514'
  },
  googleBookAPI: 'https://www.googleapis.com/books/v1/volumes'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
