import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { CardModule } from 'primeng/card';
import { LittlePokemon } from '../../../../core/interfaces/little.interface';
import { forkJoin, map, switchMap } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-tabla-pokemon',
	standalone: true,
	imports: [
		CommonModule,
		TableModule,
		CardModule,
		TagModule,
		DialogModule,
		ButtonModule
	],
	templateUrl: './tabla-pokemon.component.html',
	styleUrls: ['./tabla-pokemon.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class TablaPokemonComponent implements OnInit {
	public littlePokemon: LittlePokemon[] = [];
	public pokemonSeleccionado:LittlePokemon | null=null;

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
							id: this.extraerId(pokemon.url),
							name:pokemon.name,
							types:detalles.types,
							abilities:detalles.abilities,
							sprites:detalles.sprites,
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

	private extraerId(url: string): number {
		const parts = url.split('/');
		return Number(parts[parts.length - 2]);
	  }

	visible: boolean = false;

    showDialog(pokemon:LittlePokemon) {
		this.pokemonSeleccionado=pokemon;
        this.visible = true;
    }
}