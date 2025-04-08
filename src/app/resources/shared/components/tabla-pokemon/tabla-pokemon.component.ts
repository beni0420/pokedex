import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

@Component({
	selector: 'app-tabla-pokemon',
	standalone: true,
	imports: [
		CommonModule,
		TableModule,
		ButtonModule,
		DialogModule,
		CardModule,
		TagModule,
		RouterLink,
	],
	templateUrl: './tabla-pokemon.component.html',
	styleUrls: ['./tabla-pokemon.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class TablaPokemonComponent implements OnInit {
	pokemonList: { id: number; name: string }[] = []; //añadir url?
	first = 0;
	rows = 10;
	totalRecords: number = 0;

	selectedPokemon: {
		id: number;
		name: string;
		types: string[];
		spriteUrl: string;
		abilities: string[];
	  } | null = null;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit() {
        this.cargarPokemons();
    }

	cargarPokemons() {
		const offset = this.first;
		this.pokemonService.getPokemonPage(this.rows, offset).subscribe((data) => {
		  this.pokemonList = data.results.map((pokemon, index) => ({
			id: offset + index + 1,
			name: pokemon.name,
		  }));
		  this.totalRecords = data.count;  // Actualizar el número total de registros
		});
	  }

	  next() {
		if (!this.isLastPage()) {
		  this.first = this.first + this.rows;
		  this.cargarPokemons();  // Recargar los Pokémon
		}
	  }

	  prev() {
		if (!this.isFirstPage()) {
		  this.first = this.first - this.rows;
		  this.cargarPokemons();  // Recargar los Pokémon
		}
	  }

	  reset() {
		this.first = 0;
		this.cargarPokemons();  // Recargar los Pokémon
	  }

	  onPageChange(event:LazyLoadEvent) {
		this.first = event.first??0;
		this.rows = event.rows??10;
		this.cargarPokemons();  // Recargar los Pokémon
	  }

	  isLastPage(): boolean {
		return this.first + this.rows >= this.totalRecords;
	  }

	  isFirstPage(): boolean {
		return this.first === 0;
	  }
}


	// ngOnInit(): void {
	// 	this.cargarPokemons(this.first);
	// }

	// 

	//   onPageChange(event: any) {
	// 	this.first = event.first;// Actualiza el índice de la página
	// 	this.rows = event.rows;// Actualiza el número de elementos por página
	// 	const offset = this.first; // Calcula el offset basado en la página actual
	// 	this.cargarPokemons(offset);// Llama a la API con el nuevo offset
	//   }
	// }
	
	//   next() {
	// 	this.first = this.first + this.rows;
	// 	this.cargarPokemons();
	//   }
	
	//   prev() {
	// 	this.first = this.first - this.rows;
	// 	this.cargarPokemons();
	//   }
	
	//   goToPage(pageNumber: number) {
	// 	  this.first = (pageNumber - 1) * this.rows;
	// 	  this.cargarPokemons();
	//   }
	
	//   isLastPage(): boolean {
	// 	  return this.first + this.rows >= this.totalRecords;
	//   }
	
	//   isFirstPage(): boolean {
	// 	  return this.first === 0;
	//   }
	
