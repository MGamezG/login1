import { AuthService } from './../../services/auth/auth.service';
import { UserModel } from './../../models/user.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }
  user:UserModel = new UserModel()
  ngOnInit(): void {
  }
  logIn(form: NgForm) {
    if (form.invalid) {
      return;

    } else {
      // console.log(form);
      // console.log(this.user)
      this.authService.login(this.user).subscribe(
        (response)=>{
          console.log(response);
        },
        (errorResponse)=>{
          console.log(errorResponse.error.error.message);
        }
      )
    }
  }

}
