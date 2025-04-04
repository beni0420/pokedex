import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../components/interfaces/pokemon-details.interface';

//Registra el servicio como singleton a nivel de aplicación.(Evita necesidad de declararlo en módulos)
@Injectable({
	providedIn: 'root',
})

//URL base de la API de Pokémon.(EndPoint principal para obtener listado de Pokémon)
export class ApiService {
	private urlApi = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';

	//Instancia del servicio HttpClient para hacer peticiones
	constructor(private http: HttpClient) {}


	getNombre(): Observable<{ results: { name: string; url: string }[] }> {
		return this.http.get<{ results: { name: string; url: string }[] }>(
			this.urlApi
		);
	}


	getIdYTipo(url: string): Observable<PokemonDetails> {
		return this.http.get<PokemonDetails>(url);
	}


  
}
