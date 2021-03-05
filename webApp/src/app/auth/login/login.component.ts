import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id = new FormControl('', Validators.required);

  constructor(private service: UserService, private route: Router) { }

  ngOnInit(): void {

  }

  async login(){
    await this.service.getData();
    this.route.navigate(['user/1']);
  }

}
