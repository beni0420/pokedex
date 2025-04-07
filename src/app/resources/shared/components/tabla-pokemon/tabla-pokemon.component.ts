//1. Importaciones y dependencias
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Pokemon } from '../../../../core/interfaces/pokemon.interface';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
	selector: 'app-tabla-pokemon',
	standalone: true,
	imports: [CommonModule, TableModule, ButtonModule, DialogModule, CardModule, TagModule],
	templateUrl: './tabla-pokemon.component.html',
	styleUrls: ['./tabla-pokemon.component.scss'],
	encapsulation: ViewEncapsulation.None
  })

  export class TablaPokemonComponent implements OnInit {
	pokemonList: { id: number; name: string }[] = [];
	dialogVisible = false;
	selectedPokemon: {
	  id: number;
	  name: string;
	  types: string[];
	  spriteUrl: string;
	  abilities: string[];
	} | null = null;
  
	constructor(private pokemonService: PokemonService) {}
  
	ngOnInit(): void {
	  this.cargarPokemons();
	}
  
	cargarPokemons(): void {
	  this.pokemonService.getPokemonList().subscribe({
		next: (response) => {
		  const requests = response.results.map(pokemon => 
			this.pokemonService.getPokemonDetails(pokemon.url)
		  );
  
		  forkJoin(requests).subscribe({
			next: (detalles: Pokemon[]) => {
			  this.pokemonList = detalles.map(d => ({
				id: d.id,
				name: d.name
			  }));
			},
			error: (err) => console.error('Error cargando detalles', err)
		  });
		},
		error: (err) => console.error('Error cargando lista', err)
	  });
	}
  
	verDetalles(pokemon: { id: number; name: string }): void {
	  const url = `${this.pokemonService.baseUrl}/${pokemon.id}`;
	  this.pokemonService.getPokemonDetails(url).subscribe({
		next: (detalles) => {
		  this.selectedPokemon = {
			id: detalles.id,
			name: detalles.name,
			types: detalles.types.map(t => t.type.name),
			spriteUrl: detalles.sprites.front_default,
			abilities: detalles.abilities.map(a => a.ability.name)
		  };
		  this.dialogVisible = true;
		},
		error: (err) => console.error('Error cargando detalles', err)
	  });
	}
  }