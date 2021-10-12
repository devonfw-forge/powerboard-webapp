



import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
 
import { SetupComponent } from './setup.component';
 
describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ SetupComponent ],
      providers: []
    })
    .compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
 
  
});