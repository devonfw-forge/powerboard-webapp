import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  class MockToasterService{
    success(message, title){
      return message + title;
    }
    error(message, title){
      return message + title;
    }
    info(message, title){
      return message + title;
    }
    warning(message, title){
      return message + title;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      providers:[{provide:ToastrService,useClass:MockToasterService}]
    });
    service = TestBed.inject(NotificationService);
  });

   it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success',()=>{
    spyOn(service.toastr,'success');
    service.showSuccess("","");
    expect(service.toastr.success).toHaveBeenCalled();
  });

  it('should show error',()=>{
    spyOn(service.toastr,'error');
    service.showError("","");
    expect(service.toastr.error).toHaveBeenCalled();
  });

  it('should show warning',()=>{
    spyOn(service.toastr,'warning');
    service.showWarning("","");
    expect(service.toastr.warning).toHaveBeenCalled();
  });

  it('should show info',()=>{
    spyOn(service.toastr,'info');
    service.showInfo("","");
    expect(service.toastr.info).toHaveBeenCalled();
  });
  
});
