import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllUsersComponent} from './all-users/all-users.component';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  {path: '', component: AllUsersComponent},
  {path: 'add', component: AddUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
