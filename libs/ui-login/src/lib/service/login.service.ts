import { Injectable } from '@angular/core';
import { Login } from '@thirty/api-interfaces';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  mockUserProfile: Login = {
    id: '0',
    username: 'app',
    password: '12345'
  }


  constructor() { }

  get(): Login{
    return this.mockUserProfile;
  }
}
