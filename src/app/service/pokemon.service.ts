import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {

  }

  getPokemon(offset = 0) {
    return this.http
      .get<{ results: any[] }>(`${environment.baseUrl}/pokemon?offset=${offset}&limit=25`)
      .pipe(
        map(result => result.results),
        map((pokemon) => {
          return pokemon.map((poke, index) => {
            return {
              ...poke,
              image: this.getPokeImage(offset + index + 1),
              pokeIndex: offset + index + 1
            };
          });
        })
      );
  }

  getPokeImage(index: number) {
    return `${environment.imageUrl}${index}.png`;
  }

  findPokemon(search: string) {
    return this.http.get<{ id: number; name: string; sprites: any }>(`${environment.baseUrl}/pokemon/${search}`).pipe(
      map(pokemon => ({
        ...pokemon,
        image: this.getPokeImage(pokemon.id),
        pokeIndex: pokemon.id
      }))
    );
  }

  getPokeDetails(index: any) {
    return this.http.get<{ sprites: { [key: string]: string | null } }>(`${environment.baseUrl}/pokemon/${index}`).pipe(
      map(poke => {
        const sprites = Object.keys(poke.sprites);
        const images = sprites
        return {
          ...poke,
          images: sprites
            .map(spriteKey => poke.sprites[spriteKey])
            .filter(img => img !== null)
            .slice(0, 6)
        };
      })
    );
  }

  findPokemonSuggestions(search: string) {
    return this.http.get(`${environment.baseUrl}/pokemon?limit=100`).pipe(
      map((res: any) => {
        return res.results
          .filter((poke: any) => 
            poke.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((poke: any, index: number) => {

            const pokeIndex = index + 1; 
            return {
              id: poke.id,
              name: poke.name,
              image: this.getPokeImage(poke.id) 
            };
          });
      })
    );
  }
}
