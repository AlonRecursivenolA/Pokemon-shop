import { Component, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { User } from '../../models/user';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'

})
export class Login {
  loginForm = new FormGroup({
    name : new FormControl('', [Validators.required, this.userValidator]),
    password : new FormControl('', [Validators.required, this.passwordValidator]),
  })
  constructor(private authService: Auth, private router: Router){
    
  }
  passwordValidator(control:AbstractControl): ValidationErrors | null{
    if(control.value.length < 8){
      return {length :"Please insert a 8 letter password"};
    }
    if (!/[A-Z]/.test(control.value)) {
      return {capital :'Please add a capital letter'}
    }
    if(!/[0-9]/.test(control.value)){
      return {letter:"Please add a letter"}
    }

    return null;
  }
  userValidator(control:AbstractControl):ValidationErrors | null{
    
    if(control.value.length < 6){
      return {length : 'user name is too short. please insert a 6 chars user name'}
    }
    return null;
  }

  handleLogin(form:any){
    const nameOfUser=form.name;
    const storagedData = localStorage.getItem(`${nameOfUser}`);
    const storagedUserName = storagedData ? JSON.parse(storagedData).userName : null;
    const storagedPassword = storagedData ? JSON.parse(storagedData).password : null;
    
    if(storagedUserName === form.name && storagedPassword === form.password){
      localStorage.setItem('whosLoggedIn', storagedUserName)
      this.router.navigate(['/shop']);
    }
    else{
       alert('user does not exist!');
    }
  }
}

