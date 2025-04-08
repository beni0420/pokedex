import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';

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
	pokemonList: { id: number; name: string; url: string }[] = [];
	first = 0;
	rows = 10;
	totalRecords: number = 0;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit() {
		this.cargarTodos();
	}

	cargarTodos() {
		this.pokemonService.getAllPokemon().subscribe({
		  next: (allPokemon) => {
			this.pokemonList = allPokemon;
			this.totalRecords = 1025; // Forzar el total real en vez de poner .length
		  },
		  error: (err) => console.error('Error cargando Pokémon', err)
		});
	  }
	  //Si necesitas el count dinámico, usa la respuesta de la API, pero ten en cuenta que PokéAPI PUEDE DEVOLVER UN VALOR INCORRECTO PARA COUNT. En ese caso, usa un valor fijo como 1025.

	onPageChange(event: any) {
		this.first = event.first;
		this.rows = event.rows;
	}
}
