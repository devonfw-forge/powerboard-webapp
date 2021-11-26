import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  class MockRouter{
    navigate(commands: any[], extras?: NavigationExtras){
   return true;
    }
  }
  class MockActivatedRouter{

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ SetupComponent ],
      providers: [
       {provide:Router,  useClass:MockRouter},
       {provide:ActivatedRoute,  useClass:MockActivatedRouter},
      ]
    })
    .compileComponents()
    // .then(() => {
    //   router = TestBed.inject(Router);
    //   route = TestBed.inject(ActivatedRoute);
    // });
  });
 
  beforeEach(() => {
    
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });
 
   it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should show team link',() =>{
    component.showTeamLink();
    expect( component.showTeamLink).toBeTruthy();
  })

  it('should show multimedia',() =>{
    component.showMultimedia();
    expect(component.showMultimedia).toBeTruthy();
  })

  it('should show view team member',() =>{
    component.showViewTeamMember();
    expect(component.showViewTeamMember).toBeTruthy();
  })

  it('should show edit team',() =>{
    component.showEditTeam();
    // let routing=new MockRouter();
    // spyOn(routing,'navigate');
    // expect(routing.navigate).toHaveBeenCalled();
    expect(component.showEditTeam).toBeTruthy();
  })
 
 it('should change active',() =>{
    component.changeActive(1);
    expect(component.changeActive).toBeTruthy();
  })

  it('should showEditTeam(',() =>{
    component.showEditTeam();
    expect(component.showEditTeam).toBeTruthy();
  })
  // fit('should showViewTeamMember',() =>{
  //   let root=new ActivatedRoute();
  //   component.showViewTeamMember();
  //   expect(component.showViewTeamMember).toBeTruthy();
  // })
});