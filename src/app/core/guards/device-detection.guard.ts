import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceGuard  {

  constructor(private device: DeviceDetectorService,
              private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const deviceIsMobile = this.device.isMobile() || this.device.isTablet();

    console.log('deviceIsMobile', deviceIsMobile);

    if (deviceIsMobile && route.path === 'desktop') {
      this.router.navigate(['mobile']);
      return false;
    }
    if (!deviceIsMobile && route.path === 'mobile') {
      this.router.navigate(['desktop']);
      return false;
    }

    return true;
  }
}
