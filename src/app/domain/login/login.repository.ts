import { ResourceService } from 'src/app/core/services/resource.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Login} from './models/login'
@Injectable({
  providedIn: 'root',
})
export class LoginRepository extends ResourceService<Login> {
  // constructor(httpClient: HttpClient) {
  //   super(httpClient);
  // }
  getResourceUrl(): string {
    return 'auth/login';
  }



}
