import {  Component, OnInit, ViewChild } from '@angular/core';
import {  IonInfiniteScroll } from '@ionic/angular/standalone';
import { PokemonService } from '../service/pokemon.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
// import { DetailsPage } from '../details/details.page';
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

  //   this.pokeService.findPokemonSuggestions(value).subscribe(res => {
  //     this.suggestions = res; 
  //   }, err => {
  //     this.suggestions = []; 
  //     console.error('Error al obtener sugerencias:', err);
  //   });
  // }

  // selectSuggestion(suggestion: any) {
  //   this.router.navigate(['/details', suggestion.id]);
  //   this.suggestions = []; // Limpia las sugerencias
  
  }

  
  

}
//   onSearchChange(event: any) {
//     const searchTerm = event.detail.value?.toLowerCase().trim() || '';

//     if (searchTerm === '') {
//       // Si no hay término de búsqueda, mostrar todos los Pokémon cargados
//       this.filteredPokemon = [];
//     } else {
//       // Filtrar Pokémon que empiecen con el término de búsqueda exacto
//       this.filteredPokemon = this.allPokemon.filter(poke => {
//         const pokemonName = poke.name.toLowerCase();
//         return pokemonName.startsWith(searchTerm);
//       });
//     }
//   }

//   // Método para determinar si se deben mostrar los Pokémon filtrados o todos los Pokémon cargados
//   get pokemonList() {
//     // Mostrar los Pokémon filtrados si hay resultados, de lo contrario mostrar todos los Pokémon
//     return this.filteredPokemon.length > 0 || this.offset === 0
//       ? this.filteredPokemon
//       : this.allPokemon; // Mostrar todos si no hay filtro activo
//   }
// }




