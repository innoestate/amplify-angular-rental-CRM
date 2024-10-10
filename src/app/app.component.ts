import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { Hub } from 'aws-amplify/utils';
import 'aws-amplify/auth/enable-oauth-listener';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{

  title = 'amplify-angular-template';

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }

  ngOnInit() {
    console.log('init app')
    Hub.listen("auth", async (data) => {
      console.log('auth payload', data);
      const { payload } = data;
      switch (payload.event) {
        case "signInWithRedirect":
          const user = await getCurrentUser();
          const userAttributes = await fetchUserAttributes();
          console.log({user, userAttributes});
          break;
        case "signInWithRedirect_failure":
          // handle sign in failure
          break;
        case "customOAuthState":
          const state = payload.data; // this will be customState provided on signInWithRedirect function
          console.log(state);
          break;
      }
    });
  }


}
