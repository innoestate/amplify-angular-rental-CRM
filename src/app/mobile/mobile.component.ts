import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import { LayoutComponent } from '../core/common/layout.component';


Amplify.configure(outputs);

@Component({
  selector: 'mobile',
  templateUrl: './mobile.component.html',
  styleUrl: './mobile.component.less',
})
export class MobileComponent extends LayoutComponent{}
