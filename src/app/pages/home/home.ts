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

  pokemonList:any = [];
  // nonSortedPokemonlist:any = [];
  constructor(private pokemonSelectedList: PokemonService, private router : Router){

  }
  ngOnInit(): void {
      // this.pokemonSelectedList.selectedPokemons.subscribe((pokemon)=>{
      //   this.pokemonList=pokemon;
      // })
      const getUser = localStorage.getItem('whosLoggedIn');
      const userData = localStorage.getItem(`${getUser}`);
      if(userData){
        let usersPokemonList = JSON.parse(userData).selectedItems;
        for(let pokemon of usersPokemonList){
          if(pokemon !== null && pokemon !== undefined){
            this.pokemonList.push(pokemon);
          }
        }
        this.pokemonList.sort((a: {strength:any},b : {strength : any})=> a.strength - b.strength)
      }
  }
    getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max); 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    handleTraining(pokemon:any){
        // console.log(this.pokemonList.filter((a: any)=> a.id===index))
        const increasePowerRandomaly:number = this.getRandomInt(5,100);
        pokemon.strength += increasePowerRandomaly;
        const currentUser = localStorage.getItem(`whosLoggedIn`);
        const currentObject = localStorage.getItem(`${currentUser}`);
        

      }
}
