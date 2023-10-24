import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService{
  constructor(private router:Router){}


getToken(){
  return localStorage.getItem('tokenUser');

}

setToken(token:string){
  localStorage.setItem("tokenUser",token);

}
logoutUser()
  {
    localStorage.removeItem("tokenUser")
    this.router.navigateByUrl('/login')
  }

}
