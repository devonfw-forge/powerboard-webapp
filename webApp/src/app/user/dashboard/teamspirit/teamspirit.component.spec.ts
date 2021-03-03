import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamspiritComponent } from './teamspirit.component';

describe('TeamspiritComponent', () => {
  let component: TeamspiritComponent;
  let fixture: ComponentFixture<TeamspiritComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamspiritComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamspiritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
