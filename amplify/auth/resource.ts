import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
        scopes: ['email']
      },
      callbackUrls: ['http://localhost:4200', 'https://rentx.fr', 'https://609eeb184f58717c9b9b.auth.eu-west-3.amazoncognito.com/oauth2/idpresponse'],
      logoutUrls: ['http://localhost:4200', 'https://rentx.fr'],
    }
  },

});
