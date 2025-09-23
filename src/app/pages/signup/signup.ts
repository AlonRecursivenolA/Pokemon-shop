import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class Signup implements OnInit{
  // id:number = 0;
  signUpForm = new FormGroup({
    name : new FormControl('', [Validators.required, this.userValidator]),
    password : new FormControl('', [Validators.required, this.passwordValidator]),
  })
  constructor(private authService: AuthService,private router: Router){
    
  }
  ngOnInit(): void {
      this.authService.logout();
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

  handleRegister(form:any){
    this.authService.register(form.name, form.password).subscribe({
      next : () => this.router.navigate(['/shop']),
      error : (err) => console.error(err)
    })
  }
}
