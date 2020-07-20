import { Component, OnInit} from '@angular/core';
import { LoginService } from '../../service/login.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'

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
    private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username : [''],
      password : [''],
    })
    
  }

  login(){
    this.router.navigate(['/pets']);
  }

}