import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'
import { GeneralService } from 'src/app/service/general.service';
/* mport { NotificationService } from 'src/app/service/notification.service'; */
import { ConfigureMultimediaServiceService } from './configure-multimedia-service.service';

import { ConfigureMultimediaComponent } from './configure-multimedia.component';
import { ExpressionBinding } from '@angular/compiler';

describe('ConfigureMultimediaComponent', () => {
  let component: ConfigureMultimediaComponent;
  let fixture: ComponentFixture<ConfigureMultimediaComponent>;
/* let notifyService : NotificationService; */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ConfigureMultimediaComponent ],
      providers: [ConfigureMultimediaServiceService, GeneralService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(ConfigureMultimediaComponent);
    component = fixture.componentInstance;
/*     notifyService = TestBed.inject(NotificationService); */
   /*  toastrService = TestBed.inject(ToastrService); */
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check home in slideshow',() =>{
    component.currentFolder = component.homeFile.folderName;
    component.checkHomeInslideShowStatus();
    let checkStatus = true;
    for(let file of component.multimediaFiles){
      if(!file.inSlideShow){
       checkStatus = false;
      }
    }
        expect(component.homeFile.inSlideShow).toEqual(checkStatus)
  })

  it('should show home files', () =>{
    component.updateComponent();
    component.showHomeFiles();
    expect(component.currentFolder).toEqual(component.homeFile.folderName);
  })

  it('should get files from folder', () =>{
    component.getFilesFromFolder(component.multimedia.root[0].folderId, component.multimedia.root[0].folderName);
      expect(component.multimediaFiles).toBeTruthy();
  })

  it('should select and deselect all', () =>{
    component.isMasterSel = false;
    component.SelectAndDeselectAll();
    expect(component.isMasterSel).toEqual(true);
    component.SelectAndDeselectAll();
    expect(component.isMasterSel).toEqual(false);
  })

  it('should select all', () =>{
    component.currentFolder = component.homeFile.folderName;
    component.selectAll();
    expect(component.isMasterSel).toEqual(true);
  })

  it('should check root selection', () =>{
    let len = component.multimedia.root.length;
    for(let i = 0 ; i<len; i++){
     
      if(component.multimedia.root[i].isSelected){
        component.checkRootSelection(i);
        expect(component.multimedia.root[i].isSelected).toEqual(false);
      }
      else{
        component.checkRootSelection(i);
        expect(component.multimedia.root[i].isSelected).toEqual(true);
      }
    }
  })
});
