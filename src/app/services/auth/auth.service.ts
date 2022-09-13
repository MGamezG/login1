import { UserModel } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  generalUrl='https://identitytoolkit.googleapis.com/v1/'
  ApiKey='AIzaSyBHA7jzYzAcV7ZkUOOWt1oSR3vjy5tLgsc'

  constructor(private http:HttpClient) { }
  /**
   * optener un usuario
   * @param user
   * @returns
   */
  login(user:UserModel):Observable<any>{
    const authData={
      email:user.email,
      password:user.password,
      returnSecureToke:true
    }
    //const url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'

    return this.http.post(`${this.generalUrl}accounts:signInWithPassword?key=${this.ApiKey}`,authData)
  }
  logout(){}

  /**
   * crear un nuevo usuario
   * @param user
   * @returns
   */
  postUser(user:UserModel):Observable<any>{
    const authData={
      email:user.email,
      password:user.password,
      returnSecureToke:true
    }
    return this.http.post(`${this.generalUrl}accounts:signUp?key=${this.ApiKey}`,authData);
   //const url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
  }
}
