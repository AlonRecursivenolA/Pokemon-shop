import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { HeroShop } from './hero-shop/hero-shop';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Login,
    Signup,
    HeroShop,
    Home
  ],
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
  ],
  exports:[Login, Signup, HeroShop, Home]
})
export class PagesModule { }
