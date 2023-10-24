import { ResourceService } from 'src/app/core/services/resource.service';
import { Injectable } from '@angular/core';
import {Login} from './models/login'
@Injectable({
  providedIn: 'root',
})
export class LoginRepository extends ResourceService<Login> {

  getResourceUrl(): string {
    return 'auth/login';
  }



}
