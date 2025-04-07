//crear una interfaz con la respuesta de la api
export interface PokemonDetails {
	id: number;
	name: string;
	sprites: { front_default: string };
	abilities: {
		ability: { name: string };
		is_hidden: boolean;
	}[];
	types: {
		type: { name: string };
	}[];
}