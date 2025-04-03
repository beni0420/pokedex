import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../components/models/pokemon-details.interface';

//Registra el servicio como singleton a nivel de aplicación.(Evita necesidad de declararlo en módulos)
@Injectable({
	providedIn: 'root',
})

//URL base de la API de Pokémon.(EndPoint principal para obtener listado de Pokémon)
export class ApiService {
	private urlApi = 'https://pokeapi.co/api/v2/pokemon';

	//Instancia del servicio HttpClient para hacer peticiones
	constructor(private http: HttpClient) {}

	//observable:Indica que la respuesta es asíncrona (flujo de datos reactivo).
	//la respuesta es un objeto con una propiedad results.
	//Cada elemento en results es un objeto con dos propiedades: name: Nombre del Pokémon (tipo string). url: URL para obtener detalles adicionales (tipo string).
	//http.get: Método de Angular HttpClient para solicitudes GET.
	//<{...}>: Define la estructura de la respuesta esperada (TypeScript).
	//this.urlApi: URL base de la API

	getNombre(): Observable<{ results: { name: string; url: string }[] }> {
		return this.http.get<{ results: { name: string; url: string }[] }>(
			this.urlApi
		);
	}

	//Parámetro url: string. tipo string, Recibe la URL específica de un Pokémon. La URL se obtiene previamente de otra llamada a la API (ej: desde results en getNombre()).
	//tipo de retorno: observable(la respuesta es un flujo de datos asíncrono (patrón reactivo))+Interfaz TypeScript que define la estructura de los datos del Pokémon (PokemonDetails). 
	//<PokemonDetails>: Especifica el tipo de dato esperado en la respuesta.
	//url: Endpoint de la API para detalles del Pokémon.

	getIdYTipo(url: string): Observable<PokemonDetails> {
		return this.http.get<PokemonDetails>(url);
	}

	getPokemonDetails(id: number): Observable<PokemonDetails> {
		return this.http.get<PokemonDetails>(`${this.urlApi}/pokemon/${id}`);
	  }
}
