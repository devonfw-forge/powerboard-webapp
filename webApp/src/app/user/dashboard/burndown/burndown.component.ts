import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {

  burnDown: any = { "status": "On Time",
  "remainingDays": 5, "remainingWork": 18 , "count": 0 };
  constructor() { }

  ngOnInit(): void {
  }

}
