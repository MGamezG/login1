import { AuthService } from './../../services/auth/auth.service';
import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user!:UserModel;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.user=new UserModel();
    // this.user.email=''
    // this.user.name=''
    // this.user.password=''

  }
  OnSubmit(form:NgForm){
    if(form.invalid){
      return;
    }else{
    //   console.log(form)
    // console.log('formulario enviado');
    // console.log(this.user)
    this.authService.postUser(this.user).subscribe(
      (response:any)=>{
        console.log(response)
      },
      (errorResponse)=>{
        console.log(errorResponse.error.error.message)
      }
    )
    }


  }

}
