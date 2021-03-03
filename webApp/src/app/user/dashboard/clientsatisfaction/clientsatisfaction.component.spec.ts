import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsatisfactionComponent } from './clientsatisfaction.component';

describe('ClientsatisfactionComponent', () => {
  let component: ClientsatisfactionComponent;
  let fixture: ComponentFixture<ClientsatisfactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsatisfactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
