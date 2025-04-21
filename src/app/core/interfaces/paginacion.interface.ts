//creo una interfaz con los 3 valores que necesito de la api
export interface Paginacion{
    count: number;
    offset: number;//"desde" posicion, indice, 
    limit:number;//cantidad por pag
}

//offset 0, limit 20  => desde posicion 0, cantidad 20 por pagina