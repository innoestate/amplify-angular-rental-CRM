import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnerModalComponent } from './create-owner-modal.component';

describe('CreateOwnerModalComponent', () => {
  let component: CreateOwnerModalComponent;
  let fixture: ComponentFixture<CreateOwnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOwnerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOwnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
