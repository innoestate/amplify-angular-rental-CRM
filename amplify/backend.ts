import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { getRentReceipt } from './functions/rentReceipt/resource';

defineBackend({
  auth,
  data,
  getRentReceipt
});
