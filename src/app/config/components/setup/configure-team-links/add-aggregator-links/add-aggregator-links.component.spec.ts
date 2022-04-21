import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddAggregatorLinksComponent } from './add-aggregator-links.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetupService } from 'src/app/config/services/setup.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { LinksCategory } from 'src/app/shared/model/general.model';
import { LinkTypeFilterPipe } from 'src/app/config/pipes/link-type-filter.pipe';

describe('AddAggregatorLinksComponent', () => {
  let component: AddAggregatorLinksComponent;
  let fixture: ComponentFixture<AddAggregatorLinksComponent>;

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

  class MockSetupService {
    onSubmit() {
      return null;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [AddAggregatorLinksComponent, LinkTypeFilterPipe],
      providers: [
        { provide: SetupService, useClass: MockSetupService },
        { provide: NotificationService, useClass: MockNotifyService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAggregatorLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update link', () => {
    let link: LinksCategory = {
      linkId: '12233',
      linkTitle: 'Meeting_Link',
    };
    component.updateLinkType(link);
    expect(component.addLink.controls['linkType'].value).toEqual(link.linkId);
  });
});
