export interface LittlePokemon {
	id: number;
	name: string;
	types: Types[];
}
export interface Types {
	slot: number;
	type: BasicInfo;
}
export interface BasicInfo {
	name: string;
	url: string;
}
