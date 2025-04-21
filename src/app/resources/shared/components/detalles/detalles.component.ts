import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { LittlePokemon } from '../../../../core/interfaces/little.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-detalles',
	imports: [CommonModule, CardModule, TagModule, ButtonModule],
	templateUrl: './detalles.component.html',
	styleUrl: './detalles.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DetallesComponent {
	pokemon: LittlePokemon | null = null;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private pokemonService: PokemonService
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.loadPokemon(+id);
		}
	}

	loadPokemon(id: number): void {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
		this.pokemonService
			.getTipos(url)
			.subscribe({
				next: (detalles) => {
					this.pokemon = detalles;
				},
				error: (err) => {
					this.router.navigate([`/error`]);
				},
			});
	}

  volver() {
    this.router.navigate(['/']);
  }
}
