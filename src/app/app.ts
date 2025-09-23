import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PokemonService } from './core/services/pokemon-service';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App{
  currentRoute: string = '';


  constructor(private router:Router, private authService: AuthService){
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
    }

  isLoggedIn(){

    if (typeof window !== 'undefined' && localStorage.getItem('jwt') !== null) {
      return true;
    }
    return false;
  }
  logout() {
      this.authService.logout();
      this.router.navigate(['/login'])
  }
  navigate() {
    if (this.currentRoute === '/home') {
      this.router.navigate(['/shop']);
    } else if (this.currentRoute === '/shop') {
      this.router.navigate(['/home']);
    }
  }

  getToggleButtonLabel(): string {
    return this.currentRoute === '/home' ? 'Shop' : 'Dash Board';
  }
  getPageName():string {
    if(this.isLoggedIn()){
    return this.currentRoute === '/home' ? 'Dash Board' : 'Shop'
    }
    return this.currentRoute === '/login' ? 'Login' : 'Signup'
  }
  isBuyButton():boolean{
    return this.currentRoute === '/home' ? true : false;
  }
  isTrainButton(){
    return this.currentRoute === '/home' ? false : true;
  }
}
