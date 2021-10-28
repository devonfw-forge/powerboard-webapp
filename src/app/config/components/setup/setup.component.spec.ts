import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
 
import { SetupComponent } from './setup.component';
 
describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let route: ActivatedRoute; 
  /* let router = {
    navigate: jasmine.createSpy('navigate')
  } */
  let router : Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ SetupComponent ],
      providers: []
    })
    .compileComponents();
  });
 
  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
    
  });
 
  /* it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should show team link',() =>{
    component.showTeamLink();
    expect(router.navigate).toBeTruthy();
  })

  it('should show multimedia',() =>{
    component.showMultimedia();
    expect(router.navigate).toBeTruthy();
  })

  it('should show view team member',() =>{
    component.showViewTeamMember();
    expect(router.navigate).toBeTruthy();
  })

  it('should show edit team',() =>{
    component.showEditTeam();
    expect(router.navigate).toBeTruthy();
  })
 */
  it('should change active',() =>{
    component.changeActive(1);
  })
});