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

  handleTraining(pokemon: any) {
    const currentUser = localStorage.getItem(`whosLoggedIn`);
    const userData = localStorage.getItem(`${currentUser}`);
    const user = userData ? JSON.parse(userData) : null;
    const dayInMilliSeconds = 60*60*24*1000;
    let lastPokemonTimeTrained:number = Date.now();
    const pokemonToUpdate = user.selectedItems.find((p: any) => p && p.id === pokemon.id);
    if (pokemonToUpdate) {
      const increasePowerRandomaly: number = this.getRandomInt(5, 20);
      pokemonToUpdate.strength += increasePowerRandomaly;
      if(pokemonToUpdate.lastPokemonTimeTrained !== null && pokemonToUpdate.lastTimeTrained + dayInMilliSeconds < Date.now()){
        pokemonToUpdate.timesTrainedToday = 0;
      }
      if(pokemonToUpdate.timesTrainedToday === 4){
        alert('cannot train anymore today please wait 24hours');
      }
      pokemonToUpdate.lastTimeTrained = lastPokemonTimeTrained;
      pokemonToUpdate.timesTrainedToday += 1;

      const index = this.pokemonList.findIndex((pokemon:any) => pokemon && pokemon.id === pokemonToUpdate.id);
      if (index !== -1) {
        this.pokemonList[index].strength = pokemonToUpdate.strength;
        this.pokemonList[index].lastTimeTrained = pokemonToUpdate.lastTimeTrained;
        this.pokemonList[index].timesTrainedToday = pokemonToUpdate.timesTrainedToday;
      }

      this.pokemonList = [...this.pokemonList];
      localStorage.setItem(`${currentUser}`, JSON.stringify(user));
    }
  }
}
