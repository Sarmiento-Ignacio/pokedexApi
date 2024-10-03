import { Component, OnInit, ViewChild } from '@angular/core';
import { IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonSkeletonText, IonSearchbar, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { PokemonService } from '../service/pokemon.service';
import { Pokemon } from '../models/pokemon-response';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailsPage } from '../details/details.page';

interface SearchbarChangeEventDetail {
  value?: string | null; // Asegúrate de que puede ser null
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [DetailsPage, IonBackButton, IonButtons, IonSearchbar, IonHeader, IonToolbar, IonSkeletonText, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent, CommonModule, RouterModule],
})
export class HomePage implements OnInit {
  offset = 0;
  pokemon: Pokemon[] = [];
  allPokemon: Pokemon[] = []; // Almacena todos los Pokémon cargados
  filteredPokemon: Pokemon[] = []; // Almacena los Pokémon filtrados
  @ViewChild(IonInfiniteScroll)
  infinite!: IonInfiniteScroll;




  constructor(private pokeService: PokemonService) { }

  ngOnInit() {
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?: any) {
    if (loadMore) {
      this.offset += 25;
    }
    this.pokeService.getPokemon(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];
      this.allPokemon = [...this.pokemon];

      if (event) {
        event.target.complete();
      }

      if (this.offset == 125) {
        this.infinite.disabled = true;
      }

    });
  }

  onSearchChange(e: CustomEvent<SearchbarChangeEventDetail>) {
    const value = e.detail.value ?? '';  // Manejar null y undefined

    if (value === '') {
      this.offset = 0;
      this.loadPokemon(); // Llama a la función para cargar Pokémon
      return;
    }

    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
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




