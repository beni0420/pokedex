import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon, PokemonGeneral } from '../interfaces/pokemon.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService {
	private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
	public contador: number = 0;

	constructor(private http: HttpClient) {}

	// Obtiene solo nombres y URLs para imprimir en la tabla
	getPokemonList(
		limit: number = 20
	): Observable<{ results: { name: string; url: string }[] }> {
		return this.http.get<{ results: { name: string; url: string }[] }>(
			`${this.baseUrl}?limit=${limit}`
		);
	}

	// Obtiene detalles de un Pokémon específico (id) al pulsar
	getPokemonDetails(id: number): Observable<Pokemon> {
		return this.http.get<Pokemon>(`${this.baseUrl}/${id}`);
	}

	//limit: cantidad; offset: posicion, indice, desde
	getPokemonPage(limit: number, offset: number): Observable<PokemonGeneral> {
		return this.http.get<PokemonGeneral>(
			`${this.baseUrl}?limit=${limit}&offset=${offset}`
		);
	}


	//pokemon.url.split('/'): Divide la URL en segmentos.
	// Ejemplo: "https://.../pokemon/1000/" → ["https:", "", "...", "pokemon", "1000", ""]
	// .filter(Boolean): Elimina elementos vacíos.
	// Resultado: ["https:", "...", "pokemon", "1000"]
	// .pop(): Obtiene el último elemento ("1000").
	// +: Convierte a número (1000).

	//La expresión pokemon.url.split('/').filter(Boolean).pop() puede devolver undefined si la URL no sigue el formato esperado. TypeScript advierte que no puedes convertir undefined a número con el operador +.
	//Usa optional chaining (?.) y nullish coalescing (??) para manejar casos donde pop() devuelva undefined

	getAllPokemon(): Observable<Pokemon[]> {
		return this.http.get<PokemonGeneral>(`${this.baseUrl}?limit=2000`).pipe(
		  map(response => response.results.map(pokemon => {
			// Extraer el ID real de la URL
			const idString = pokemon.url.split('/').filter(Boolean).pop();
			const id = +(idString ?? 0); // Si no se puede extraer el ID, usa 0 como valor por defecto
	  
			return {
			  ...pokemon,
			  id: id // Asigna el ID extraído o el valor por defecto
			};
		  }))
		);
	  }
}
