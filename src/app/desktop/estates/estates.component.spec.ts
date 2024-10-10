import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopEstatesComponent } from './estates.component';

describe('EstatesComponent', () => {
  let component: DesktopEstatesComponent;
  let fixture: ComponentFixture<DesktopEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesktopEstatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
