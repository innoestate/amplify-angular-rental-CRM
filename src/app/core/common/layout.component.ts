import { Directive, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import outputs from '../../../../amplify_outputs.json';
import { Observable } from 'rxjs';

Amplify.configure(outputs);

@Directive()
export class LayoutComponent implements OnInit {

  user$!: Observable<any>;

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }

  ngOnInit(): void {
    // this.user$ = this.authenticator.pipe(({ authStatus }) => {
    //   if (authStatus === 'authenticated') {
    //     console.log('user', this.authenticator.user);
    //   }
    // });
  }

}
