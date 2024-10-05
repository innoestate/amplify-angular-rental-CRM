import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLodgerPopupComponent } from './create-lodger-popup.component';

describe('CreateLodgerPopupComponent', () => {
  let component: CreateLodgerPopupComponent;
  let fixture: ComponentFixture<CreateLodgerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLodgerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLodgerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
