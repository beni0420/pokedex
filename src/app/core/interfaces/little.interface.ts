export interface LittlePokemon {
	id: number;
	url: string;
	name: string;
	abilities: {
		ability: {
			name: string;
			url: string;
		};
		is_hidden: boolean;
		slot: number;
	}[];
	sprites:{front_default:string};
	types: { type: { name: string } }[]; //es un array de objetos
}