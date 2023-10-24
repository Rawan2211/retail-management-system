import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginRepository } from 'src/app/domain/login/login.repository';
import { Login } from 'src/app/domain/login/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  loginForm!:FormGroup;
  login:Login[]=[];
  constructor(private authService:AuthService,private formBuilder : FormBuilder,private loginRepository:LoginRepository,private router:Router){

  }

  ngOnInit(){
    this.createLoginForm();

  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username: ['' , [Validators.required]],
      password: ['' , [Validators.required]],
  });
  }

  loginUser(login: Login)
  {
    this.loginRepository.add(login).subscribe((response)=>{
      if (response.accessToken!=null) {
        this.authService.setToken(response.accessToken);
        this.router.navigate(['/customer']);
      }
      else{
        this.router.navigate(['/login']);

      }


  })
  }



}
