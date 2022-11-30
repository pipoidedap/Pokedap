/* No hace falta importar React porque utilizamos JavaScript puro. Pasamos como parametro al Pokemon que estamos buscando. */
export const searchPokemon = async (pokemon) => {
  /* Try / Catch al consumir un API no queremos que la App muera. */
  try {
    /* Creamos la variable donde guarda el URL del Pokemon */
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    /* Responde el Pokemon buscado */
    const response = await fetch(url);
    /* Guardamos como data el Pokemon encontrado. */
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/* En limit y offset vamos a pasarle la cantidad de pokemons que queremos traer. Va a estar limitada por la cantidad y desde cual. */
export const getPokemons = async (limit=25, offset=0) => {
  /* Try / Catch al consumir un API no queremos que la App muera. */
  try {
    /* Creamos la variable donde guarda el URL del Pokemon */
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    /* Responde los Pokemons buscados */
    const response = await fetch(url);
    /* Guardamos como data los pokemons encontrados. */
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

/* Ya que le estamos pasando el URL de cada Pokemon, lo pasamos como parametro. */
export const getPokemonData = async (url) => {
	try {
		/* Responde el Pokemon buscado */
		const response = await fetch(url);
		/* Guardamos como data el Pokemon encontrado. */
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error)
	}
}