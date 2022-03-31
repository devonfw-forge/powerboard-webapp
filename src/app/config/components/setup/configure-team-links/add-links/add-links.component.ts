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
  addedLink: any;
  receiveAddedLink: any;
  constructor(
    private fb: FormBuilder,
    public setupService: SetupService,
    public notifyService: NotificationService
  ) {
    this.selectedLinkType = 'Select Type';
    this.error = false;
  }

   /**
    * Form group created
    * set validators for link details
    */
  async ngOnInit(){
    this.addLink = this.fb.group({
      linkName: ['', [Validators.required]],
      linkType: ['', [Validators.required]],
      links: ['', [Validators.required]],
      teamId: [''],
    });
    await this.getLinkTypes();
  }

  async getLinkTypes() {
    this.linkTypes = await this.setupService.getLinkTypes();
  }


  /**
   * Get TeamId from local storage and set value in add link form
   * Add link using setup service
   * If links added successfully,rest form and display success message
   * If error while adding link, display error message
   */
  async onSubmit(){
    if(this.addLink.valid){
      this.receiveAddedLink = [];
      this.addedLink = null;
      this.addLink.controls.teamId.setValue(
        JSON.parse(localStorage.getItem('TeamDetailsResponse'))
          .powerboardResponse.team_id
      );
      console.log(this.addLink.value);
      try {
        const data = await this.setupService.addLink(this.addLink.value);
        this.receiveAddedLink = data;
        this.addLink.reset();
        this.error = false;
        this.selectedLinkType = 'select Type';
        this.notifyService.showSuccess('Link added successfully', '');
        console.log(data);
        return this.receiveAddedLink;
      } catch (e) {
        this.notifyService.showError(e.error.message, '');
      }
    } else {
      this.error = true;
    }
  }

  /**
   * Update the link type in form using link id and title
   */
  updateLinkType(link: LinksCategory){
    const type=link.linkTitle.split('_');
    const outcome= type[0]+' ' +type[1];
    this.selectedLinkType=outcome;
    this.addLink.controls['linkType'].setValue(link.linkId);
  }
}
