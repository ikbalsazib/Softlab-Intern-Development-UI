import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../interfaces/user.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit, OnDestroy {

  users: User[] = [];

  // Subscriptions
  private subData: Subscription;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  /**
   * HTTP REQ HANDLE
   * getAllUsers()
   */

  private getAllUsers() {
    this.subData = this.userService.getAllUsers()
      .subscribe((res) => {
        this.users = res.data;
        console.log(res)
      }, (err) => {
        console.log(err)
      })
  }


  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subData) {
      this.subData.unsubscribe();
    }
  }


}
