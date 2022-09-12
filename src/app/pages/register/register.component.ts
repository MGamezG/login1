import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user!:UserModel;

  constructor() { }

  ngOnInit(): void {
    this.user=new UserModel();
    this.user.email='dmfsmdfms@email.com'
    this.user.name='mg'
    this.user.password='12432'
  }
  OnSubmit(){
    console.log('formulario enviado');
    console.log(this.user)

  }

}
