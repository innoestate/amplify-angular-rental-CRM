import { defineAuth, secret } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },

});


// externalProviders: {
//   google: {
//     clientId: secret("521860874760-229koeigpu42vhuq03kk84hts2h6hg94.apps.googleusercontent.com"),
//     clientSecret: secret('SECRET'),
//   },
//   callbackUrls: ['http://localhost:4200/', 'https://rentx.fr'],
//   logoutUrls: ['http://localhost:4200/', 'https://rentx.fr'],
// }
