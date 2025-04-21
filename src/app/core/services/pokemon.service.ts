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

	getPokemons(): Observable<{name: string; url: string }[]> {
		return this.http.get<Response>(this.baseUrl).pipe(
			map((response) => response.results)
		);
	}

	getTipos(url: string): Observable<LittlePokemon> {
		return this.http.get<LittlePokemon>(url);
	}
}
