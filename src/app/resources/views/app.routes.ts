import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from './error/error.component';

//cuando estemos en el path vacio (localhost sin barras), vamos a cargar el componente tabla
export const routes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'error', component: ErrorComponent },
	//{path: 'pokemon/:idPokemon', component: PokemonDetailComponent}
];
