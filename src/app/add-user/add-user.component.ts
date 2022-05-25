import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  // Data Form
  dataForm?: FormGroup;
  @ViewChild('templateForm') templateForm: NgForm;

  // Subscriptions
  private subData: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

    this.initForm();

  }

  /**
   * INIT FORM
   */
  private initForm() {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      phoneNo: [null, Validators.required],
    });

  }

  onSubmit() {
    if (this.dataForm.invalid) {
      console.log('INVALID Form!')
      return;
    }
    this.addUser();


  }


  /**
   * HTTP REQ HANDLE
   * getAllUsers()
   */

  private addUser() {
    this.subData = this.userService.addUser(this.dataForm.value)
      .subscribe((res) => {
        console.log(res)
        this.templateForm.resetForm();
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
