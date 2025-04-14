import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { CardModule } from 'primeng/card';
import { LittlePokemon } from '../../../../core/interfaces/little.interface';
import { forkJoin, map, switchMap } from 'rxjs';
import { TagModule } from 'primeng/tag';

@Component({
	selector: 'app-tabla-pokemon',
	standalone: true,
	imports: [
		CommonModule,
		TableModule,
		CardModule,
		TagModule
	],
	templateUrl: './tabla-pokemon.component.html',
	styleUrls: ['./tabla-pokemon.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class TablaPokemonComponent implements OnInit {
	public littlePokemon: LittlePokemon[] = [];

	constructor(private pokemonService: PokemonService) {}

	ngOnInit() {
		this.cargarPokemons();
	}

	private cargarPokemons():void{
		this.pokemonService.getPokemons().pipe(
			switchMap(pokemonsBasicos=>{
				const requests=pokemonsBasicos.map(pokemon=>
					this.pokemonService.getTipos(pokemon.url).pipe(
						map(detalles=>({
							id:pokemon.id,
							name:pokemon.name,
							types:detalles.types,
							url:pokemon.url
						}))
					)
				);
				return forkJoin(requests);
			})
		).subscribe({
			next:(pokemonsCompletos)=>this.littlePokemon=pokemonsCompletos,
			error:(err)=>console.error('Error al cargar Pokemon', err)
		});
	}
}
