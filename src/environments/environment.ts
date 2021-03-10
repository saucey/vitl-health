// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api_endpoint: 'https://gql-testing.vitl.com',
  hmr: true,
  stripeKey: 'pk_test_4Q1fHbl72dTjbVKPb5IJc0A2',
  firebase: {
      apiKey: 'AIzaSyAbD7mR6vPNErIvWLhbh1ZR2GhvJjRzN0c',
      authDomain: 'vitl-75a86.firebaseapp.com',
      databaseURL: 'https://vitl-75a86.firebaseio.com',
      projectId: 'vitl-75a86',
      storageBucket: 'vitl-75a86.appspot.com',
      messagingSenderId: '638854340227'
  }
};
