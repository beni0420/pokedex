import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Paginacion } from '../../../../core/interfaces/paginacion.interface';

@Component({
	selector: 'app-tabla-pokemon',
	standalone: true,
	imports: [
		CommonModule,
		TableModule,
		CardModule,
		TagModule,
		DialogModule,
		ButtonModule,
		RouterLink,
	],
	templateUrl: './tabla-pokemon.component.html',
	styleUrls: ['./tabla-pokemon.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class TablaPokemonComponent implements OnInit {
	public littlePokemon: { name: string; url: string }[] = [];
	paginacion: Paginacion = { count: 0, offset: 0, limit: 10 };
	first = 0;
	rows = 10;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit() {
		this.cargarPokemons();
	}

	private cargarPokemons(): void {
		this.pokemonService
			.getPokemons(this.paginacion.offset, this.paginacion.limit)
			.subscribe({
				next: (response) => {
					this.littlePokemon = response.results;
					this.paginacion.count = response.count;
				},
			});
	}

	pageChange(event: any) {
		this.first = event.first;
		this.rows = event.rows;
		this.paginacion.offset = event.first;
		this.paginacion.limit = event.rows;
		this.cargarPokemons();
	}

	isLastPage(): boolean {
		return this.littlePokemon
			? this.first + this.rows >= this.paginacion.count
			: true;
	}

	isFirstPage(): boolean {
		return this.littlePokemon ? this.first === 0 : true;
	}

	extraerId(url: string): number {
		const parts = url.split('/');
		return Number(parts[parts.length - 2]);
	}
}
