import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../interfaces/user.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  // Data Form
  dataForm?: FormGroup;
  @ViewChild('templateForm') templateForm: NgForm;

  // Store Data
  id: string;
  user: User = null;

  // Subscriptions
  private subData: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.initForm();

    this.activatedRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
      if (this.id) {
        this.getUserById();
      }
    });



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
    if (this.id) {
      this.editUser();
    } else {
      this.addUser();
    }



  }


  /**
   * HTTP REQ HANDLE
   * getAllUsers()
   */

  private getUserById() {
    this.subData = this.userService.getUserById(this.id)
      .subscribe((res) => {
        this.user = res.data;
        if (this.user) {
          this.dataForm.patchValue(this.user)
        }
        console.log('res', res)
      }, (err) => {
        console.log(err)
      })
  }

  private addUser() {
    this.subData = this.userService.addUser(this.dataForm.value)
      .subscribe((res) => {
        console.log(res)
        this.templateForm.resetForm();
      }, (err) => {
        console.log(err)
      })
  }

  private editUser() {
    this.subData = this.userService.editUser(this.id, this.dataForm.value)
      .subscribe((res) => {
        console.log(res)
        // this.templateForm.resetForm();
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
