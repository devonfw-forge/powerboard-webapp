import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodequalityComponent } from './codequality.component';

describe('CodequalityComponent', () => {
  let component: CodequalityComponent;
  let fixture: ComponentFixture<CodequalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodequalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodequalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
