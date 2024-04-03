export const environment = {
  production: true,
  name: 'production',
  firebase: {
    config: {
      apiKey: process.env['AEP_API_KEY'],
      authDomain: process.env['AEP_AUTH_DOMAIN'],
      projectId: process.env['AEP_PROJECT_ID'],
      storageBucket: process.env['AEP_STORAGE_BUCKET'],
      messagingSenderId: process.env['AEP_MESSAGING_SENDER_ID'],
      appId: process.env['AEP_APP_ID'],
    },
    actionCodeSettings: {
      url: 'http://localhost:5200/profile/new',
      handleCodeInApp: true,
    },
  },
};
