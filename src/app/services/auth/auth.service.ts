import { UserModel } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  generalUrl='https://identitytoolkit.googleapis.com/v1/'
  ApiKey='AIzaSyBHA7jzYzAcV7ZkUOOWt1oSR3vjy5tLgsc'

  constructor(private http:HttpClient) { }
  login(user:UserModel){}
  logout(){}
  getUsers(){
    const url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
  }

  /**
   * crear un nuevo usuario
   * @param user
   * @returns
   */
  postUser(user:UserModel){
    const authData={
      email:user.email,
      password:user.password,
      returnSecureToke:true
    }
    return this.http.post(`${this.generalUrl}accounts:signUp?key=${this.ApiKey}`,authData);
   //const url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
  }
}
