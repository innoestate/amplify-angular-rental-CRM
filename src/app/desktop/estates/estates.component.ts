import { Component } from '@angular/core';
import { EstatesComponent } from '../../core/common/estates.component';


@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrl: './estates.component.less'
})
export class DesktopEstatesComponent extends EstatesComponent {}
