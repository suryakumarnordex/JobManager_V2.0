import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { User } from '../../Models/user';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: [],
})
export class UserInfoComponent implements OnChanges {
  @Input() email: string;

  user: User;
  loading = false;
  error = false;
  errorMessage = '';

  constructor(private loginSevice: LoginService) {}

  ngOnChanges(_changes: { [propKey: string]: SimpleChange }) {
    if (!this.email) {
      this.error = true;
      this.errorMessage = 'no user';
      this.loading = false;
      return;
    }
    this.loading = true;
  }
}
