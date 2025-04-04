//1. Importaciones y dependencias
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

//2. configuración del componente
@Component({
	selector: 'app-tabla-pokemon',
	standalone: true,
	imports: [
		CommonModule,
		TableModule,
		CardModule,
		TagModule,
		ButtonModule,
		DialogModule,
	],
	templateUrl: './tabla-pokemon.component.html',
	styleUrls: ['./tabla-pokemon.component.scss'],
})
export class TablaPokemonComponent implements OnInit {
	pokemon: { id: number; name: string; types: string[]; spriteUrl: string}[] = [];

	//referenciamos al servicio y le ponemos un nombre para usarlo dentro del componente
	constructor(private apiService: ApiService) {}

	//3. Inicialización. Se ejecuta una vez al inicializar el componente: Carga los datos de Pokémon al montar el componente.
	ngOnInit(): void {
		this.cargarPokemons();
	}

	cargarPokemons() {
		this.apiService.getNombre().subscribe(
		  (response) => {
			const requests = response.results.map((pokemon) =>
			  this.apiService.getIdYTipo(pokemon.url)
			);
	
			forkJoin(requests).subscribe(
			  (detailsArray: PokemonDetails[]) => {
				this.pokemon = detailsArray.map((details) => ({
				  id: details.id,
				  name: details.name,
				  types: details.types.map((type: any) => type.type.name),
				  spriteUrl: details.sprites.front_default
				}));
			  },
			  (error) => {
				console.error('Error al obtener los detalles de los Pokémon:', error);
			  }
			);
		  },
		  (error) => {
			console.error('Error al obtener la lista de Pokémon:', error);
		  }
		);
	  }
	dialogVisible: boolean = false;
	selectedPokemon: { id: number; types: string[]; spriteUrl: string } | null = null;

	detallesPokemon(id: number, types: string[], spriteUrl: string): void {
		this.selectedPokemon = { id, types, spriteUrl };
		this.dialogVisible = true;
	  }
	}
