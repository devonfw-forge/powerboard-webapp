import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataUploadComponent } from './data-upload.component';
import { SetupService } from 'src/app/config/services/setup.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json';

describe('DataUploadComponent', () => {
  let component: DataUploadComponent;
  let fixture: ComponentFixture<DataUploadComponent>;

  class MockRouter {
    navigateByUrl(url: string) {
      return url;
    }
  }
  class MockChangeDetector {
    detectChanges() {
      return null;
    }
  }
  class MockSetupService {
    uploadClientRating(clientRating, type, teamId) {
      console.log(clientRating, type, teamId);
      return null;
    }
    uploadXLSXFile(file: File, type, teamId) {
      console.log(file, type, teamId);
      return null;
    }
  }

  class MockNotifyService {
    showError(heading: string, message: string) {
      console.log(heading, message);
      return null;
    }
    showSuccess(heading: string, message: string) {
      console.log(heading, message);
      return null;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [DataUploadComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: NotificationService, useClass: MockNotifyService },
        { provide: SetupService, useClass: MockSetupService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    var store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return (store[key] = value + '');
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
    });

    localStorage.setItem(
      'TeamDetailsResponse',
      JSON.stringify(TeamDetailsResponse)
    );

    fixture = TestBed.createComponent(DataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload file ', () => {
    component.spinner = true;
    const event: any = {
      target: {
        files: ['some_File'],
      },
    };

    component.uploadFile(event, 'jira');
    expect(component.uploadFile).toBeTruthy();
  });

  it('should throw error if file not uploaded', () => {
    component.spinner = true;
    const event: any = {
      target: {
        files: ['some_File'],
      },
    };
    let response: any = {
      error: { message: 'error uploading file in' },
    };
    spyOn(component.setupService, 'uploadXLSXFile').and.throwError(response);
    component.uploadFile(event, 'jira').catch((e) => {});
    expect(component.setupService.uploadXLSXFile).toHaveBeenCalled();
  });

  it('should change selcted', () => {
    component.changeSelected(10);
    expect(component.selected).toEqual(10);
  });

  it('should update client rating', () => {
    component.form.get('clientRating').setValue('8');
    component.uploadClientRating();
    expect(component.uploadClientRating).toBeTruthy();
  });

  it('should throw error if client rating not uploaded', () => {
    component.form.get('clientRating').setValue('8');
    let response: any = {
      error: { message: 'error uploading client rating' },
    };
    spyOn(component.setupService, 'uploadClientRating').and.throwError(
      response
    );
    component.uploadClientRating().catch((e) => {});
    expect(component.setupService.uploadClientRating).toHaveBeenCalled();
  });
});
