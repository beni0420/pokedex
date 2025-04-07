import { Component } from '@angular/core';
import { TablaPokemonComponent } from '../../shared/components/tabla-pokemon/tabla-pokemon.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-main',
  imports: [TablaPokemonComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
