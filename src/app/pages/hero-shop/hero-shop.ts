import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon-service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-hero-shop',
  standalone: false,
  templateUrl: './hero-shop.html',
  styleUrl: './hero-shop.scss',
})
export class HeroShop implements OnInit{
  pokemonList:any = [];
  bought = false;
  constructor(private pokemon:PokemonService, private router: Router){

  }

  ngOnInit(): void {
      this.pokemonList = this.pokemon.getPokemons();
  }

  // signOut(){
  //   localStorage.removeItem('whosLoggedIn');
  //   this.router.navigate(['/login'])
  // }

    handleSell(index: number) {
     
      const whosLoggedIn = localStorage.getItem('whosLoggedIn');
      const userData = localStorage.getItem(`${whosLoggedIn}`);
      if(userData){
          const currentUser = JSON.parse(userData);
          let currentPokemonList = currentUser.selectedItems;
          currentPokemonList[index] = this.pokemonList[index];
          currentUser.pokemonList = currentPokemonList;
          localStorage.setItem(`${whosLoggedIn}`, JSON.stringify(currentUser));
          this.bought =true;
      }
    }
    handleRedirect(){
      this.router.navigate(['/home'])
    }
}

