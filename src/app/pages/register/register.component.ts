import { AuthService } from './../../services/auth/auth.service';
import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user!:UserModel;
  rememberMe:boolean=false
  constructor(private authService:AuthService,
              private router:Router) { }

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
    Swal.fire({
      allowOutsideClick:false,
      title:'Procesando',
      text:'espere...',
    });
    Swal.showLoading();

    this.authService.postUser(this.user).subscribe(
      (response:any)=>{
        console.log(response)
        Swal.close()
        if (this.rememberMe=true) {
          sessionStorage.setItem('email',this.user.email)
        }
        this.router.navigate(['/home'])
      },
      (errorResponse)=>{
        Swal.fire({
          title: 'Error!',
          text: 'aerror al autenticar',
          icon: 'error',
          confirmButtonText: 'ok'
        })
        console.log(errorResponse.error.error.message)
      }
    )
    }


  }

}
