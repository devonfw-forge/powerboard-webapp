import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SetupService } from 'src/app/config/services/setup.service';
import { AggregationLinkType } from 'src/app/shared/model/general.model';

import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-add-aggregator-links',
  templateUrl: './add-aggregator-links.component.html',
  styleUrls: ['./add-aggregator-links.component.css']
})
export class AddAggregatorLinksComponent implements OnInit {
  addAggregationLink: FormGroup;
  linkTypes: AggregationLinkType[];
  selectedLinkType: string;
  error: boolean;
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
    this.addAggregationLink = this.fb.group({
      url: ['', [Validators.required]],
      linkType: ['', [Validators.required]],
      aggregationFrequency: [''],
      isActive: [''],
      startDate: [''],
      teamId: [''],
    });
    await this.getAggregationLinkTypes();
  }

  async getAggregationLinkTypes() {
    try {
      this.linkTypes = [];
      const data = await this.setupService.getAggregationLinkTypes();
      this.linkTypes = data;
      console.log(this.linkTypes);
    } catch (e) {
      this.notifyService.showError(e.error.message, '');
    }
  }


  /**
   * Get TeamId from local storage and set value in add link form
   * Add link using setup service
   * If links added successfully,rest form and display success message
   * If error while adding link, display error message
   */
  async onSubmit(){
    console.log("inside onsubmit add aggregation links")
    if(this.addAggregationLink.valid){
      console.log("add aggregation link is valid");
      this.receiveAddedLink = [];
      this.addAggregationLink.controls.aggregationFrequency.setValue(15);
      let date = new Date();
      this.addAggregationLink.controls.startDate.setValue(date);
      this.addAggregationLink.controls.teamId.setValue(
        JSON.parse(localStorage.getItem('TeamDetailsResponse'))
          .powerboardResponse.team_id
      );
      this.addAggregationLink.controls.isActive.setValue(true);
      console.log(this.addAggregationLink.value);
      try {
        const data = await this.setupService.addAggregationLink(this.addAggregationLink.value);
        this.receiveAddedLink = data;
        this.addAggregationLink.reset();
        this.error = false;
        this.selectedLinkType = 'select Type';
        let name = this.setupService.capitalizeFirstLetter(this.receiveAddedLink.linkType.title);
        this.notifyService.showSuccess(name+' link added successfully', '');
        console.log(data);
        return this.receiveAddedLink;
      } catch (e) {
        let message = this.setupService.capitalizeFirstLetter(e.error.message);
        this.notifyService.showError(message, '');
      } 
    } else {
      this.error = true;
    }
  }

  /**
   * Update the aggregation link type in form using link id and title
   */
  updateLinkType(link: AggregationLinkType){
    this.selectedLinkType=link.linkTitle;
    this.addAggregationLink.controls['linkType'].setValue(link.linkId);
  }
}
