import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAggregatorLinksComponent } from './add-aggregator-links.component';

describe('AddAggregatorLinksComponent', () => {
  let component: AddAggregatorLinksComponent;
  let fixture: ComponentFixture<AddAggregatorLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAggregatorLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAggregatorLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
