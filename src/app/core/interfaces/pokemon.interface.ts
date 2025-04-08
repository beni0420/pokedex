export interface PokemonGeneral {
	count: number;
	next: string | null;
	previous: string | null;
	results: Pokemon[];
}
export interface Pokemon {
	id: number;
	name: string;
	url: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: Ability[];
	forms: BasicInfo[];
	game_indices: Game[];
	held_items: Items[];
	moves: Array<{
		move: BasicInfo;
		version_group_details: VersionGroupDetails[];
	}>;
	species: BasicInfo[];
	sprites: {
		back_default: string;
		back_female: string;
		back_shiny: string;
		back_shiny_female: string;
		front_default: string;
		front_female: string;
		front_shiny: string;
		front_shiny_female: string;
		other: Other;
		versions: Versions;
	};
	cries: Cries[];
	stats: Stats[];
	types: Types[];
	past_types: PastTypes[];
}
export interface PastTypes {
	generation: BasicInfo;
	types: Types[];
}
export interface Types {
	slot: number;
	type: BasicInfo;
}
export interface Stats {
	base_stat: number;
	effort: number;
	stat: BasicInfo;
}
export interface Cries {
	latest: string;
	legacy: string;
}
export interface GenerationVIII {
	icons: DreamWorld[];
}
export interface GenerationVII {
	icons: DreamWorld[];
	'ultra-sun-ultra-moon': Home;
}
export interface GenerationVI {
	'omegaruby-alphasapphire': Home[];
	'x-y': Home[];
}
export interface GenerationV {
	black_white: BlackAndWhite[];
}
export interface BlackAndWhite {
	animated: Showdown[];
}
export interface GenerationIV {
	diamond_pearl: Showdown[];
	heartgold_soulsilver: Showdown[];
	platinum: Showdown[];
}
export interface Versions {
	'generation-i': GenerationI;
	'generation-ii': GenerationII;
	'generation-iii': GenerationIII;
	'generation-iv': GenerationIV;
	'generation-v': GenerationV;
	'generation-vi': GenerationVI;
	'generation-vii': GenerationVII;
	'generation-viii': GenerationVIII;
}
export interface GenerationIII {
	emerald: OfficialArtwork[];
	firered_leafgreen: BasicInfoGenerationII[];
	ruby_sapphire: BasicInfoGenerationII[];
}
export interface GenerationII {
	crystal: BasicInfoGenerationII[];
	gold: BasicInfoGenerationII[];
	silver: BasicInfoGenerationII[];
}
export interface BasicInfoGenerationII {
	back_default: string;
	back_shiny: string;
	front_default: string;
	front_shiny: string;
}

export interface GenerationI {
	red_blue: BasicInfoGenerationI[];
	yellow: BasicInfoGenerationI[];
}

export interface BasicInfoGenerationI {
	back_default: string;
	back_gray: string;
	front_default: string;
	front_gray: string;
}
export interface Other {
	dream_world: DreamWorld;
	home: Home;
	'official-artwork': OfficialArtwork;
	showdown: Showdown;
}
export interface DreamWorld {
	front_default: string;
	front_female: string;
}
export interface Home {
	front_default: string;
	front_female: string;
	front_shiny: string;
	front_shiny_female: string;
}
export interface OfficialArtwork {
	front_default: string;
	front_shiny: string;
}
export interface Showdown {
	back_default: string;
	back_female: string;
	back_shiny: string;
	back_shiny_female: string;
	front_default: string;
	front_female: string;
	front_shiny: string;
	front_shiny_female: string;
}

export interface VersionGroupDetails {
	level_learned_at: number;
	version_group: BasicInfo;
	move_learn_method: BasicInfo;
}

export interface Items {
	item: BasicInfo;
	version_details: Details[];
}
export interface Details {
	rarity: number;
	version: BasicInfo;
	location_area_encounters: string;
}
export interface Game {
	game_index: number;
	version: BasicInfo[];
}
export interface Ability {
	is_hidden: boolean;
	slot: number;
	ability: BasicInfo;
}

export interface BasicInfo {
	name: string;
	url: string;
}
