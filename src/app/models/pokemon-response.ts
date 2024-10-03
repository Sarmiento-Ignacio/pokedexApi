export interface Sprite {
  front_default: string | null; // Imagen frontal por defecto
  back_default: string | null;  // Imagen trasera por defecto
  [key: string]: string | null;
  // Puedes agregar más propiedades según lo que devuelva la API
}


export interface Pokemon {
    id: number;   
    pokeIndex: number;
    image: string;
    name: string;
    url: string;
    sprites: Sprite;
    images?: string[];
  }
  
  export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
    
  }