import { Directive } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import outputs from '../../../../amplify_outputs.json';

Amplify.configure(outputs);

@Directive()
export class LayoutComponent {

  title = 'amplify-angular-template';

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }

}
