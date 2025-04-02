import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { forkJoin } from 'rxjs';


@Component({
	selector: 'app-tabla-pokemon',
	imports: [TableModule, CommonModule, CardModule, TagModule, ButtonModule],
	templateUrl: './tabla-pokemon.component.html',
	styleUrls: ['./tabla-pokemon.component.scss'],
})
export class TablaPokemonComponent implements OnInit {
	pokemon: {
		id: number;
		name: string;
		types: string[];
	}[] = [];

  constructor(private apiService:ApiService){}

  ngOnInit():void{
    this.cargarPokemons();
  }

  cargarPokemons(){
    this.apiService.getNombre().suscribe(
      response=>{
        const requests=response.results.map((pokemon)=>
        this.apiService.getIdYTipo(pokemon.url)
      );

      forkJoin(requests).subscribe(
        (detailsArray:PokemonDetails[])=>{
          this.pokemon=detailsArray.map((details)=>({
            id:details.id,
            name:details.name,
            types:details.types.map((type:any)=>type.type.name)
          }));
          console.log('Datos cargados: ', this.pokemon);
        },
        error=>{
          console.error('Error al obtener los detalles: ', error);
        }
      );
      },
      error=>{
        console.error('Error al obtener los detalles: ', error);
      }
    );
  }
  detalles(){}
}
