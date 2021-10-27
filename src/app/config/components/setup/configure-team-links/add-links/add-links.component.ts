import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinksCategory } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SetupService } from '../../../../services/setup.service';

@Component({
  selector: 'app-add-links',
  templateUrl: './add-links.component.html',
  styleUrls: ['./add-links.component.css'],
})
export class AddLinksComponent implements OnInit {
  addLink: FormGroup;
  linkTypes: LinksCategory[];
  selectedLinkType: string;
  error: boolean;
  addedLink : any;
  receiveAddedLink : any;
  constructor( private fb: FormBuilder, private setupService: SetupService, private notifyService : NotificationService) {
    this.selectedLinkType='Select Type';
    this.error=false;
   }

  async ngOnInit(){
    this.addLink = this.fb.group({
      linkName: ['', [Validators.required]],
      linkType: ['', [Validators.required]],
      links: ['', [Validators.required]],
      teamId: ['']
    });
    await this.getLinkTypes();
  }

  async getLinkTypes(){
    this.linkTypes= await this.setupService.getLinkTypes(); 
  }

  async onSubmit(){
    if(this.addLink.valid){
      this.receiveAddedLink = [];
      this.addedLink = null;
    this.addLink.controls.teamId.setValue(JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id);
    console.log(this.addLink.value);
    try{
    const data= await this.setupService.addLink(this.addLink.value);
    this.receiveAddedLink =  data;
    this.addLink.reset();
    this.error=false;
    this.selectedLinkType='select Type';
    this.notifyService.showSuccess("Link added successfully","");
    /* this.addedLink.teamLinkId = this.receiveAddedLink.id;
    this.addedLink.linkName = this.receiveAddedLink.linkName;
    this.addedLink.linkType = this.receiveAddedLink.linkType.title;
    this.addedLink.links = this.receiveAddedLink.link; */
    console.log(data);
    return this.receiveAddedLink;
  }
  catch(e){
    
    this.notifyService.showError(e.error.message,'');

  }
}
else{
  this.error=true;
}
  }

  updateLinkType(link: LinksCategory){
    const type=link.linkTitle.split('_');
    const outcome= type[0]+' ' +type[1];
    this.selectedLinkType=outcome;
    this.addLink.controls.linkType.setValue(link.linkId);
  }
}
