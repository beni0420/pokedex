import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({ providedIn: 'root' })

export class PokemonService {
	public baseUrl = 'https://pokeapi.co/api/v2/pokemon';

	constructor(private http: HttpClient) {}

	getPokemonList(
		limit: number = 20
	): Observable<{ results: { name: string; url: string }[] }> {
		return this.http.get<{ results: { name: string; url: string }[] }>(
			`${this.baseUrl}?limit=${limit}`
		);
	}

	getPokemonDetails(url: string): Observable<Pokemon> {
		return this.http.get<Pokemon>(url);
	}
}
