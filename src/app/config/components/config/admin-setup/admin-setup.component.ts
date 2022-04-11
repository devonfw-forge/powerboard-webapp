import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-setup',
  templateUrl: './admin-setup.component.html',
  styleUrls: ['./admin-setup.component.css']
})
export class AdminSetupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close(){
 
  }
  public changeActive(index:number){
    let list = document.querySelectorAll('.list');
    let j=0;
    while(j<list.length){
      list[j++].className = 'list';
    }
    list[index-1].className = 'list active';
  }

}
