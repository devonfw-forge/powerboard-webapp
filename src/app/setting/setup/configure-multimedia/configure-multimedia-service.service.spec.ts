import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigureMultimediaServiceService } from './configure-multimedia-service.service';

describe('ConfigureMultimediaServiceService', () => {
  let service: ConfigureMultimediaServiceService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
    })
    .compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureMultimediaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
