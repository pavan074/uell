export const environment = {
  isNative: false,
  appName: 'Uell',
  appVersion: '1.0',
  networkType: 'internal',
  error: {
      trace: false,
      pageRedirect: false
  },
  production: false,
  language: {
      default: 'it-IT',
      list: ['it-IT']
  },
  urlWithoutAuthHeader: [],
  rootDomain: '',
  seedFake: true,
  webApi: [
      {
          name: 'Auth',
          server: [
              {
                  type: 'internal',

                  //Local
                  //url: 'http://localhost:49995/api/'

                  //Staging
                  //url: 'http://afv1webapp1wv:80/beauthazure/api/'

                  //Production
                  url: 'https://webappe.afv.it/beauthazure/api/'
              }
          ]
      },
      {
          name: 'Main',
          server: [
              {
                  type: 'internal', 

                  //Local
                  //url: 'http://localhost:58633/api/'

                  //Staging
                  //url: 'http://afv1webapp1wv:80/beAddressBook/api/'

                  //Production 
                  url: 'https://uell.metodo-solutions.com/api/'
              }
          ]
      },
      {
          name: 'BakeUp',
          server: [
              {
                  type: 'internal',
                  url: 'https://api.bakeup.it/api/' 
              }
          ]
      }
  ]
};