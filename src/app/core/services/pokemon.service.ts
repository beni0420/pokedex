import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pokemon } from "../interfaces/pokemon.interface";

@Injectable({ providedIn: 'root' })
export class PokemonService {
  public baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Obtiene solo nombres y URLs para imprimir en la tabla
  getPokemonList(limit: number = 20): Observable<{ results: { name: string; url: string }[] }> {
    return this.http.get<{ results: { name: string; url: string }[] }>(
      `${this.baseUrl}?limit=${limit}`
    );
  }

  // Obtiene detalles de un Pokémon específico al pulsar
  getPokemonDetails(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.baseUrl}/${id}`);
  }
}