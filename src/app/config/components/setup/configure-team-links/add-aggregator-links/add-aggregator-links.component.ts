import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SetupService } from 'src/app/config/services/setup.service';
import { LinksCategory } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-add-aggregator-links',
  templateUrl: './add-aggregator-links.component.html',
  styleUrls: ['./add-aggregator-links.component.css']
})
export class AddAggregatorLinksComponent implements OnInit {
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
    this.linkTypes = [];
    let jiraLink:LinksCategory = new LinksCategory();
    jiraLink.linkId= "jiraID";
    jiraLink.linkTitle="jira_link";
    this.linkTypes.push(jiraLink);
    let sonarLink:LinksCategory = new LinksCategory();
    sonarLink.linkId= "sonarID";
    sonarLink.linkTitle="sonar_link";
    this.linkTypes.push(sonarLink);
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
