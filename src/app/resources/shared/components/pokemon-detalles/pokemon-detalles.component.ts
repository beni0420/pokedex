import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../../../core/services/pokemon.service';
import { Pokemon } from '../../../../core/interfaces/pokemon.interface';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-pokemon-detalles',
  imports: [CommonModule, CardModule, TagModule],
  templateUrl: './pokemon-detalles.component.html',
  styleUrl: './pokemon-detalles.component.scss'
})
export class PokemonDetailComponent implements OnInit {
  pokemon!: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPokemon(+id);
    }
  }

  loadPokemon(id: number): void {
    this.pokemonService.getPokemonDetails(id).subscribe({
        next: (res) => this.pokemon = res,
        error: (err) => console.error(err)
      });
  }
}