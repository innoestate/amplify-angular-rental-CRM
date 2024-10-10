import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggersComponent } from './loggers.component';

describe('LoggersComponent', () => {
  let component: LoggersComponent;
  let fixture: ComponentFixture<LoggersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoggersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoggersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
