import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from 'src/app/config/services/config.service';
import { TeamService } from 'src/app/config/services/team.service';
import { GeneralService } from 'src/app/shared/services/general.service';

import { EditTeamMemberComponent } from './edit-team-member.component';

describe('EditTeamMemberComponent', () => {
  let component: EditTeamMemberComponent;
  let generalService : GeneralService;
  let configService : ConfigService;
  let teamService : TeamService;
  let fixture: ComponentFixture<EditTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      declarations: [ EditTeamMemberComponent ],
      providers:[{provide : GeneralService, useValue : generalService},
        {provide : ConfigService, useValue : configService},
        {provide : TeamService, useValue : teamService} ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    generalService = TestBed.inject(GeneralService);
    configService = TestBed.inject(ConfigService);
    teamService = TestBed.inject(TeamService);
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  });  */
});
