import { Component, OnInit } from '@angular/core';
import { Velocity } from 'src/app/shared/modals/Velocity.modal';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-velocity-comparison',
  templateUrl: './velocity-comparison.component.html',
  styleUrls: ['./velocity-comparison.component.css']
})
export class VelocityComparisonComponent implements OnInit {

  constructor(private userService: UserService) { }
  velocity:Velocity;
  ngOnInit(): void {
this.velocity = this.userService.data.dashboard.velocityDTO;
if(this.velocity.Avg==null){
  this.velocity.Avg= 90;
}
  }

}
