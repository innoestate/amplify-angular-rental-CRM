import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceGuard  {

  constructor(private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches;

    // const deviceIsMobile = this.isMobile() || this.isTablet();

    // console.log('deviceIsMobile', deviceIsMobile);

    if (isMobile && route.path === 'desktop') {
      this.router.navigate(['mobile']);
      return false;
    }
    if (!isMobile && route.path === 'mobile') {
      this.router.navigate(['desktop']);
      return false;
    }

    return true;
  }


  // isMobile(): boolean {
  //   const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  //   // Check if the device is Android or iOS
  //   return /android|iPad|iPhone|iPod/i.test(userAgent);
  // }

  // isTablet(): boolean {
  //   const userAgent = navigator.userAgent.toLowerCase();
  //   return /tablet|ipad|playbook|silk/i.test(userAgent);
  // }

  // isDesktop(): boolean {
  //   return !this.isMobile() && !this.isTablet();
  // }
}
