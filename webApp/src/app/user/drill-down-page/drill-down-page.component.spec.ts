import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillDownPageComponent } from './drill-down-page.component';

describe('DrillDownPageComponent', () => {
  let component: DrillDownPageComponent;
  let fixture: ComponentFixture<DrillDownPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrillDownPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillDownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
