import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLodgersComponent } from './mobile-lodgers.component';

describe('MobileLodgersComponent', () => {
  let component: MobileLodgersComponent;
  let fixture: ComponentFixture<MobileLodgersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileLodgersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileLodgersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
