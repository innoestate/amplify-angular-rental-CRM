import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';


Amplify.configure(outputs);

@Component({
  selector: 'mobile',
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.less',
})
export class MobileComponent implements OnInit{

  title = 'amplify-angular-template';

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }

  ngOnInit() { }


}
