import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLodgerPopupComponent } from './set-lodger-popup.component';

describe('SetLodgerPopupComponent', () => {
  let component: SetLodgerPopupComponent;
  let fixture: ComponentFixture<SetLodgerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetLodgerPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetLodgerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
