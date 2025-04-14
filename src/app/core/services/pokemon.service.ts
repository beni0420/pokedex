import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LittlePokemon } from '../interfaces/little.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService {
	private littlePokemon: LittlePokemon = { id: 0, name: "", types:[]};
	private baseUrl = "https://pokeapi.co/api/v2/pokemon/2";
  
	constructor(private http: HttpClient) {}
  
	public getPokemons(): Observable<LittlePokemon> {
	  return this.http.get<LittlePokemon>(this.baseUrl);
	}
  }