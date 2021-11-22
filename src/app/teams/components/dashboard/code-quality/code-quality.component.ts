import { Component, OnInit } from '@angular/core';
import { CodeQualityResponse } from 'src/app/shared/model/general.model';

@Component({
  selector: 'app-code-quality',
  templateUrl: './code-quality.component.html',
  styleUrls: ['./code-quality.component.css'],
})
export class CodeQualityComponent implements OnInit {
  codeQuality : CodeQualityResponse = new CodeQualityResponse();
  
  ngOnInit(): void {
    this.codeQuality = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.codeQuality;
  }
}
