export interface LittlePokemon {
	id: number;
	url:string;
	name: string;
	types: { type: { name: string } }[];//es un array de objetos
}
