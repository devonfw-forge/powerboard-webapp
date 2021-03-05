import { Component, OnInit } from '@angular/core';
import { CodeQuality } from 'src/app/shared/modals/codeQuatity.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-codequality',
  templateUrl: './codequality.component.html',
  styleUrls: ['./codequality.component.css']
})
export class CodequalityComponent implements OnInit {

  constructor(private service: UserService) { }
  codeQuality : CodeQuality;
  ngOnInit(): void {

    this.codeQuality = this.service.data.dashboard.codeQualityDTO;
  }

}
