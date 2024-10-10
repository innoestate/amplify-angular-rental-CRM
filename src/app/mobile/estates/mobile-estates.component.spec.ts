import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEstatesComponent } from './mobile-estates.component';

describe('MobileEstatesComponent', () => {
  let component: MobileEstatesComponent;
  let fixture: ComponentFixture<MobileEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileEstatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
