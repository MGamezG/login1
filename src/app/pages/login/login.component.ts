import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { UserModel } from './../../models/user.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router) { }
  user:UserModel = new UserModel()
  ngOnInit(): void {
  }
  logIn(form: NgForm) {
    if (form.invalid) {
      return;

    } else {
      // console.log(form);
      // console.log(this.user)
      Swal.fire({
        allowOutsideClick:false,
        title:'Procesando',
        text:'espere...',
      });
      Swal.showLoading();
      this.authService.login(this.user).subscribe(
        (response)=>{
          console.log(response);
          // Swal.fire({
          //   allowOutsideClick:false,
          //   icon: 'success',
          //   title:'Correcto',
          //   text:'ok',
          // });
          Swal.close()
          this.router.navigate(['/home'])
        },
        (errorResponse)=>{
          console.log(errorResponse.error.error.message);
          Swal.fire({
            title: 'Error!',
            text: 'aerror al autenticar',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        }
      )
    }
  }

}
