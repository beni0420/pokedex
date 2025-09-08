import { Component } from '@angular/core';
import 'primeflex/primeflex.scss';
import { TablaPokemonComponent } from "../../shared/components/tabla-pokemon/tabla-pokemon.component";

@Component({
  selector: 'app-main',
  imports: [TablaPokemonComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
