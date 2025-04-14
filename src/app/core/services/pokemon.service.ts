import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LittlePokemon } from '../interfaces/little.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService {
	//private littlePokemon: LittlePokemon = { id: 0, name: '', types: [] };
	private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

	constructor(private http: HttpClient) {}

	getPokemons(): Observable<{ id: number; name: string; url: string }[]> {
		return this.http.get<Response>(this.baseUrl).pipe(
			map((response) =>
				response.results.map((pokemon) => ({
					id: +pokemon.url.split('/').slice(-2)[0],
					name: pokemon.name,
					url: pokemon.url,
				}))
			)
		);
	}

	getTipos(url: string): Observable<LittlePokemon> {
		return this.http.get<LittlePokemon>(url).pipe(
			map((detalles) => ({
				id: detalles.id,
				url: url,
				name: detalles.name,
				types: detalles.types
			}))
		);
	}
}
