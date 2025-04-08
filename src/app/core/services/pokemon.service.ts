import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

export interface PokemonPags {
	count: number;
	next: string | null;
	previous: string | null;
	results: Pokemon[];
}

@Injectable({ providedIn: 'root' })

export class PokemonService {
	private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  public contador:number=0;

	constructor(private http: HttpClient) {}

	// Obtiene solo nombres y URLs para imprimir en la tabla
	getPokemonList(
		limit: number = 20
	): Observable<{ results: { name: string; url: string }[] }> {
		return this.http.get<{ results: { name: string; url: string }[] }>(
			`${this.baseUrl}?limit=${limit}`
		);
	}

	// Obtiene detalles de un Pokémon específico al pulsar
	getPokemonDetails(id: number): Observable<Pokemon> {
		return this.http.get<Pokemon>(`${this.baseUrl}/${id}`);
	}

  getPokemonPage(limit: number, offset: number): Observable<PokemonPags> {
    return this.http.get<PokemonPags>(`${this.baseUrl}?limit=${limit}&offset=${offset}`);
  }
}
