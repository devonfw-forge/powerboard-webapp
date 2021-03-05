import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  count: number;

  constructor(private service: UserService,  private route: Router) { }

  ngOnInit(): void {
    // this.service.getData();
  }

  logOut(){
    console.log("Working ...");
    this.route.navigate(['/auth/login']);
  }

  
}
