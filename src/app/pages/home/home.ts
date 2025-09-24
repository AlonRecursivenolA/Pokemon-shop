import { Component, OnInit } from '@angular/core';
import { HeroShop } from '../hero-shop/hero-shop';
import { PokemonService } from '../../core/services/pokemon-service';
import { Pokemon } from '../../models/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit{

  pokemonList$:any;
  constructor(private pokemonService: PokemonService, private router : Router){

  }
  ngOnInit(): void {
    this.pokemonList$ = this.pokemonService.usersPokemons$;
    console.log(this.pokemonList$);
    this.pokemonService.getUsersPokemons();

  }
    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

  handleTraining(index: any) {
    alert("Pokemon Trained!");
    this.pokemonService.trainPokemon(index).subscribe(
      
      (err) => console.error(err)
      
    )
  }
}
