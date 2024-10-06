import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOwnersComponent } from './mobile-owners.component';

describe('MobileOwnersComponent', () => {
  let component: MobileOwnersComponent;
  let fixture: ComponentFixture<MobileOwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileOwnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
