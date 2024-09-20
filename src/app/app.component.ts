import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { map, Observable } from 'rxjs';


Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'amplify-angular-template';
  user!: Observable<any>;
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);

  }


}
