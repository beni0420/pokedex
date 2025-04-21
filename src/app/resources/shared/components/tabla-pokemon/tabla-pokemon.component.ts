import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { CardModule } from 'primeng/card';
import { LittlePokemon } from '../../../../core/interfaces/little.interface';
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
	public littlePokemon: { name: string; url: string }[] = [];
	public pokemonSeleccionado:LittlePokemon | null=null;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit() {
		this.cargarPokemons();
	}

	private cargarPokemons():void{
		this.pokemonService.getPokemons().subscribe({
			next:(pokemonsCompletos)=>this.littlePokemon=pokemonsCompletos,
			error:(err)=>console.error('Error al cargar Pokemon', err)
		});
	}

	extraerId(url: string): number {
		const parts = url.split('/');
		return Number(parts[parts.length - 2]);
	  }

	visible: boolean = false;

	//mostrar detalles solo al pulsar
    showDialog(pokemon:{ name: string; url: string }) {
		this.pokemonService.getTipos(pokemon.url).subscribe({
			next:(detalles)=>{
				this.pokemonSeleccionado=detalles;
				this.visible=true;
			},
			error:(err)=>console.log('error al cargar detalles', err)
		});
    }
}