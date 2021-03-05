import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocityComparisonComponent } from './velocity-comparison.component';

describe('VelocityComparisonComponent', () => {
  let component: VelocityComparisonComponent;
  let fixture: ComponentFixture<VelocityComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VelocityComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
