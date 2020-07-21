import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../service/login.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { Login } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/core-data';


@Component({
  selector: 'thirty-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username : [''],
      password : [''],
    })
    
  }

  login(){
    const login: Login = this.loginService.get();

    if(this.loginForm.value.username === login.username && this.loginForm.value.password === login.password){
      this.snackBarService.openSnackBar("Login Succesful", "Okay", 2000);
      this.router.navigate(['/pets']);
    }else{
      this.snackBarService.openSnackBar("Login Failed, Invalid Credentials", "Okay", 2000);
    }

    
    
  }

}