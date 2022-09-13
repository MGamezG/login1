import { UserModel } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  generalUrl='https://identitytoolkit.googleapis.com/v1/'
  ApiKey='AIzaSyBHA7jzYzAcV7ZkUOOWt1oSR3vjy5tLgsc'
  token:any
  constructor(private http:HttpClient) {
    this.readToken()
  }
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
    .pipe(
      map((Response:any)=>{
        console.log('respuesta de map')
        this.saveToken(Response['idToken'])
        return Response
      })
    );
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
    return this.http.post(`${this.generalUrl}accounts:signUp?key=${this.ApiKey}`,authData)
    .pipe(
      map((Response:any)=>{
        console.log('respuesta de map')
        this.saveToken(Response['idToken'])
        return Response
      })
    );
   //const url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]'
  }

  saveToken(idToken:string){
    this.token=idToken;
    sessionStorage.setItem('token',idToken)
  }

  readToken(){
    if(sessionStorage.getItem('token')){
      this.token=sessionStorage.getItem('token')
    }else{
      this.token='';
    }
    return this.token
  }
}
