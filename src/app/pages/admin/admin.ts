import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon-service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit{

  usersList:any;

  constructor(private pokemonService:PokemonService){

  }

  
  ngOnInit(): void {
      this.usersList = this.pokemonService.getRegisteredUsers().subscribe({
        next : (users) => {
          this.usersList = users;
          console.log(this.usersList)
        },
        error : (err) => console.error(err)
      });
      console.log(this.usersList);
  }

}
