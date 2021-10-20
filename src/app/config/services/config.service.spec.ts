import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../environments/environment';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    httpTestingController.match(
      environment.restPathRoot + 'v1/admin/viewAllUserRoles'
    );
    expect(service).toBeTruthy();
  });

  it('should got roles', () => {
    service.getRoles().then((data) => {
      expect(data).toBeDefined();
    });
    httpTestingController.match(
      environment.restPathRoot + 'v1/admin/viewAllUserRoles'
    );
  });
});
