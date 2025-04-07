//1. Importaciones y dependencias
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
	imports: [CommonModule, TableModule, ButtonModule, DialogModule, CardModule, TagModule, RouterLink],
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
			this.pokemonList = response.results.map(pokemon => ({
				id: +pokemon.url.split('/').filter(Boolean).pop()!,
				name: pokemon.name
			  }));
			},
			error: (err) => console.error('Error cargando lista', err)
		  });
		}
  
	verDetalles(pokemon: { id: number; name: string }): void {
		this.pokemonService.getPokemonDetails(pokemon.id).subscribe({
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