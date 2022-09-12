import { UserModel } from './../../models/user.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  user:UserModel = new UserModel()
  ngOnInit(): void {
  }
  logIn(form: NgForm) {
    if (form.invalid) {
      return;

    } else {
      console.log(form);
      console.log(this.user)
    }
  }

}
