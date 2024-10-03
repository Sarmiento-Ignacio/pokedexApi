import {  Component, OnInit, ViewChild } from '@angular/core';
import {  IonInfiniteScroll } from '@ionic/angular/standalone';
import { PokemonService } from '../service/pokemon.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon: any[]= [];
  suggestions: any[] = [];
  
  @ViewChild(IonInfiniteScroll) infinite!: IonInfiniteScroll;

  constructor(private pokeService: PokemonService,private router: Router) { }

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?: any) {
    if (loadMore) {
      this.offset += 25;
    } else {
      this.offset = 0;
    }
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];

      if (loadMore) {
        this.pokemon = [...this.pokemon, ...res]; // Agrega más Pokémon
      } else {
        this.pokemon = res; 
      }

      if (event) {
        event.target.complete();
      }

      if (this.offset == 500) {
        this.infinite.disabled = true;
      }

    });
  }
  onSearchChange(e: any) {
    const value = e.detail.value;  

    if (value === '') {
      this.offset = 0;
      this.loadPokemon(); 
      this.suggestions = [];
      return;
    }
    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
      
    }, err => {
      this.pokemon = [];
      console.error('Pokémon no encontrado:', err);
    });
  }
}