import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';


Amplify.configure(outputs);
const client = generateClient<Schema>();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit{

  title = 'amplify-angular-template';
  
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(outputs);
  }

  ngOnInit() {
    this.createtest();
    this.fetchTest();
  }

  fetchTest() {
    try {
      client.models.Test.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          console.log('items', items);
        },
      });
    } catch (error) {
      console.error('error fetching todos', error);
    }
  }

  createtest() {
    try {
      client.models.Test.create({
        data: 'test',
        number: 1
      });
      console.log('created');
    } catch (error) {
      console.error('error creating todos', error);
    }
  }

  

}
