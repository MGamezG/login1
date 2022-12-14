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
  /**
   * salir de la session
   */
  logout(){
    sessionStorage.removeItem('token')
  }

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

  /**
   * almacena el token en el storage
   * @param idToken
   */
  saveToken(idToken:string){
    this.token=idToken;
    sessionStorage.setItem('token',idToken);

    let hoy=new Date()
    hoy.setSeconds(3600);
    sessionStorage.setItem('expira',hoy.getTime().toString())
  }

  /**
   * lee el token almacenado en el storage
   * @returns
   */
  readToken(){
    if(sessionStorage.getItem('token')){

      this.token=sessionStorage.getItem('token')
    }else{
      this.token='';
    }
    return this.token
  }
  /**
   * valida si esta autenticado
   * @returns token
   */
  isAuthenticated():boolean{
    if (this.token.length<2) {
     return false
    }
    const expiration=Number(sessionStorage.getItem('expira'))
    const expirationDate=new Date()
    expirationDate.setTime(expiration)

    if (expirationDate>new Date()) {
      return true
    }
    else{
      return false
    }
    // return this.token.length>2
  }
}
