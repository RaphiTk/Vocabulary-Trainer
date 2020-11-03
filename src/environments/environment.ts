// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    CLIENT_ID: "pYn9igA2s1PMicmuGE5jnPyxE8RuCWhx",
    CLIENT_DOMAIN: "vocabulary-trainer.eu.auth0.com", // e.g., 'you.auth0.com'
    REDIRECT: "http://localhost:4200?callback",
    LOGOUT_URL: "http://localhost:4200/logout"
  },
  vocabulary_server: {
    URL: "http://localhost/vocabulary-trainer/v1/actions",
//    URL: "https://vocabulary-trainer.tk/vocabulary-trainer/v1/actions",

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
