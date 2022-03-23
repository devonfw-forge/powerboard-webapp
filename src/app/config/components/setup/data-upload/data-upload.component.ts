import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent implements OnInit {
selected : number;
  constructor() { }

  ngOnInit(): void {
  }

  async uploadFile(event) { 
    try {
     const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
     
   } catch (e) {
     console.log(e.error.message);
   
   }
 }
  

 changeSelected(num : number){
   this.selected = num;
 }
}
