import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { HeroShop } from './pages/hero-shop/hero-shop';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { Auth } from './core/services/auth';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  
  {path : 'shop', component : HeroShop},
  {path : 'login', component : Login, canActivate : [authGuard]},
  {path : 'signup', component : Signup, canActivate : [authGuard]},
  {path : 'home', component : Home},
  {path : '', component : Login, canActivate : [authGuard]},
  {path : '**', component : Home}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
