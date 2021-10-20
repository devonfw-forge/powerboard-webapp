import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { GuestInfo } from '../../../model/config.model';
import { ConfigService } from '../../../services/config.service';
import { GuestService } from '../../../services/guest.service';

@Component({
  selector: 'app-add-guest',
  templateUrl: './add-guest.component.html',
  styleUrls: ['./add-guest.component.css'],
})
export class AddGuestComponent implements OnInit {
  private authError: boolean;
  userName: string;
  email: string;

  guest: GuestInfo = new GuestInfo();
  /* guestFormGroup: FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [
        Validators.required
      ]),
 
    }); */
  roleName: string;
  constructor(
    private configService: ConfigService,
    private router: Router,
    private notifyService: NotificationService,
    private guestService: GuestService
  ) {}

  ngOnInit(): void {}

  keyPressed() {
    this.authError = false;
  }

  getAuthError() {
    return this.authError;
  }

  async addGuest(addGuestForm: NgForm) {
    this.guest.role = this.configService.guestRole;
    try {
      const data = await this.guestService.addGuest(this.guest);
      if (data) {
        addGuestForm.reset();
        this.notifyService.showSuccess('Guest added successfully', '');
      }
      console.log(data);
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  snackBar(msg: string) {
    var x = document.getElementById('snackbar');
    x.style.backgroundColor = '#333';
    x.innerHTML = msg;
    x.className = 'show';
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }

  errorSnackBar(msg: string) {
    var x = document.getElementById('snackbar');
    x.style.backgroundColor = 'red';
    x.innerHTML = msg;
    x.className = 'show';
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }
}
