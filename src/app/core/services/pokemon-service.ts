import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
pokemons: Pokemon[] = [
  { id: 1, name: 'Ivysaur', imgUrl: '/assets/imgs/001.png', power: 'Overgrow', strength: 6, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 2, name: 'Charizard', imgUrl: '/assets/imgs/002.png', power: 'Blaze', strength: 9, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 3, name: 'Squirtle', imgUrl: '/assets/imgs/003.png', power: 'Torrent', strength: 5, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 4, name: 'Pikachu', imgUrl: '/assets/imgs/004.png', power: 'Static', strength: 7, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 5, name: 'Bulbasaur', imgUrl: '/assets/imgs/005.png', power: 'Overgrow', strength: 4, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 6, name: 'Venusaur', imgUrl: '/assets/imgs/006.png', power: 'Chlorophyll', strength: 10, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 7, name: 'Charmander', imgUrl: '/assets/imgs/007.png', power: 'Blaze', strength: 3, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 8, name: 'Charmeleon', imgUrl: '/assets/imgs/008.png', power: 'Blaze', strength: 8, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 9, name: 'Rattata', imgUrl: '/assets/imgs/009.png', power: 'Run Away', strength: 2, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 10, name: 'Jigglypuff', imgUrl: '/assets/imgs/010.png', power: 'Cute Charm', strength: 5, timesTrainedToday: 0, lastTimeTrained:null },
  { id: 11, name: 'Meowth', imgUrl: '/assets/imgs/011.png', power: 'Pickup', strength: 6, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 12, name: 'Psyduck', imgUrl: '/assets/imgs/012.png', power: 'Damp', strength: 3, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 13, name: 'Gengar', imgUrl: '/assets/imgs/013.png', power: 'Levitate', strength: 9, timesTrainedToday: 0, lastTimeTrained: null },
  { id: 14, name: 'Eevee', imgUrl: '/assets/imgs/014.png', power: 'Adaptability', strength: 7, timesTrainedToday: 0, lastTimeTrained: null }
];

  

private _selectedPokemons = new BehaviorSubject<Pokemon[]>([]);
selectedPokemons = this._selectedPokemons.asObservable();

// getPokemons():Observable<Pokemon[]>{

  // return new BehaviorSubject(this.pokemons).asObservable();
// }

  getPokemons():Pokemon[]{
    return this.pokemons;
  }

  addPokemon(p: Pokemon) {
    const current = this._selectedPokemons.getValue();
    this._selectedPokemons.next([...current, p]);
  }

}
