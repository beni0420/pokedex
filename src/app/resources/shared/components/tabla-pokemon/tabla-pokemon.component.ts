import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RouterLink } from '@angular/router';
import { LittlePokemon } from '../../../../core/interfaces/little.interface';

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
	public littlePokemon: LittlePokemon[] = [];

	constructor(private pokemonService: PokemonService) {}

	ngOnInit() {
		this.pokemonService
			.getPokemons()
			.subscribe((pokemons) => (this.littlePokemon = pokemons));
	}

	// private cargarPokemons():void{
	// 	this.pokemonService.getPokemons().subscribe({
	// 		next:(pokemons)=>this.littlePokemon=pokemons,
	// 		error:(err)=>console.error('Error al cargar Pokemon', err)
	// 	});
	// }
}
