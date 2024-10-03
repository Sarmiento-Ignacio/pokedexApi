import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators'
import { Pokemon, PokemonResponse } from '../models/pokemon-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {

  }

  getPokemon(offset = 0) {
    return this.http
      .get(`${environment.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map((result: any) => {
          return result['results'];
        }),
        map((pokemon: any ) => {
          return pokemon.map((poke: { image: string; pokeIndex: any; }, index: number) => {
            poke.image = this.getPokeImage(offset + index + 1);
            poke.pokeIndex = offset + index + 1;
            return poke;
          });
        })
      );
  }

  getPokeImage(index: any )  {
    return `${environment.imageUrl}${index}.png`;
  }

  findPokemon(search: any) {
    return this.http.get(`${environment.baseUrl}/pokemon/${search}`).pipe(
      map((pokemon: any ) => {
        pokemon['image'] = this.getPokeImage(pokemon['id']);
        pokemon['pokeIndex'] = pokemon['id'];
        return pokemon;
      })
    );
  }

  getPokeDetails(index: any ) {
    return this.http.get(`${environment.baseUrl}/pokemon/${index}`).pipe(
      map((poke: any ) => {
        let sprites = Object.keys(poke['sprites']);
        poke['images'] = sprites
          .map(spriteKey => poke['sprites'][spriteKey])
          .filter(img => img);
        return poke;
      })
    );
  }
}
