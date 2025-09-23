import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon-service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-hero-shop',
  standalone: false,
  templateUrl: './hero-shop.html',
  styleUrl: './hero-shop.scss',
})
export class HeroShop implements OnInit{
  buttonClicked : boolean[]= [];
  pokemons$: any;
  bought = false;
  myPokemons:any = []
  constructor(private pokemonService:PokemonService, private router: Router, ){

  }

      ngOnInit(): void {
        
        this.pokemons$ = this.pokemonService.list$;
        const pokemons = this.pokemons$.source.value;
        pokemons[0] = { ...pokemons[0], imgUrl: "../../../assets/imgs/001.png" };
        pokemons[1] = { ...pokemons[0], imgUrl: "../../../assets/imgs/002.png" };
        pokemons[2] = { ...pokemons[0], imgUrl: "../../../assets/imgs/003.png" };

        this.pokemonService.load();
      }

      handleSell(index:number){
        this.pokemonService.claimPokemon(index).subscribe({
          next: pok => {
            this.myPokemons = [...this.myPokemons, pok],
          alert('Pokemon Purchased!')},
          error : err => {
            if(err.status == 409){
              alert("Pokemon already purchased")
            }
            else{
              console.error(err)
            }
          }
        })
        this.pokemons$[index] = null;

      }
    
    handleRedirect(){
      this.router.navigate(['/home'])
    }
}

