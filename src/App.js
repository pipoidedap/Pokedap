import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import Searchbar from "./components/Searchbar";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavoriteProvider } from "./contexts/FavoriteContext";

/* Creamos la Key de nuestro LocalStorage */
const localStorageKey = 'favorite_pokemon'

function App() {
  /* Creo un Estado que sea la lista de pokemones. */
  const [pokemons, setPokemons] = useState([]);
  /* Estado que maneja en que pagina nos encontramos */
  const [page, setPage] = useState(0);
  /* Estado que me recuenta la cantidad de paginas en total. */
  const [total, setTotal] = useState(0);
  /* Estado booleano cuando carga un componente. */
  const [loading, setLoading] = useState(true);
  /* Creo un Estado que me une con FavoriteContext */
  const [favorites, setFavorites] = useState([])
  /* Creamos un Estado para cuando un Pokemon no existe. */
  const [notFound, setNotFound] = useState(false)
  /* Creamos este Estado para poder ir cambiando en base a lo que buscamos y lo que se carga, lo vamos a usar en el useEffect. */
  const [searching, setSearching] = useState(false)

  /* Obtenemos los pokemons que renderizara el useEffect. Cambiamos el contenido del result del array para crear 10 promesas de cada resultado que se encuentra, pidiendo que no corra mas codigo hasta que no regrese el array completo de promesas. */
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      /* Esto lo estamos trayendo desde el api.js */
      /* Como parametro le pasamos el limit y offset */
      const data = await getPokemons(25, 25 * page);
      /* Usamos el map para crear un array de promesas. */
      const promises = data.results.map(async (pokemon) => {
        /* Espera a que me retorne cada Pokemon */
        return await getPokemonData(pokemon.url);
      });
      /* Vamos a esperar que toda nuestra promesa regrese y le pasamos el array de promesas que creamos. */
      const results = await Promise.all(promises);
      /* Seteo a mis Pokemons con lo que obtuvimos finalmente. Y tambien seteo el total de paginas y el loading. */
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      /* Tenemos que especificar que notFound va a ser falso */
      setNotFound(false)
    } catch (error) {
      console.log(error);
    }
  };

  /* Creamos una funcion que cargue nuestros pokemones favoritos y queden guardados, creando una funcion que toma como stringh nuestros pokemones guardados y luego seteamos los favoritos.*/
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || []
    setFavorites(pokemons)
  }

  /* Cuando cargue la aplicación necesitamos que cargue el LocalStorage, por ende dentro de este useEffect vamos a utilizarlo para que cargue el LocalStorage apenas inicia la aplicación. */
  useEffect(() => {
    loadFavoritePokemons()
  }, [])

  /* useEfect va a renderizar por unica vez la funcion que le estamos pasando. */
  useEffect(() => {
    if(!searching) {
      fetchPokemons();
    }
  }, [page]);

  /* Creo la funcion que le estoy pasando en el componente de FavoriteContext en el dato que quiero traer. */
  const updateFavoritePokemons = (name) => {
    /* Creo una constante que tenga guardado los pokemones favoritos. */
    const updated = [...favorites]
    /* Ahora actualizo la lista de mis pokemones favoritos. Mi nueva constante es igual a la que guarde mis favoritos y le digo que si encuentran el nombre que le pase, lo borre de la lista o lo agregue. */
    const isFavorite = updated.indexOf(name)
    if(isFavorite >= 0) {
      updated.splice(isFavorite, 1)
    } else {
      updated.push(name)
    }
    /* Por ultimo seteo el Estado de mis pokemones favoritos con la constante que guardaba mis favoritos anteriores. */
    setFavorites(updated)
    /* Aca guardamos en el LocalStorage nuestra información. Pasamos el key y tambien la información que queremos guardar. Cuando apretemos en el corazon para añadir a favoritos, actualizamos el context y el LocalStorage al mismo tiempo. */
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated))
  }

  /* Creamos en App que es nuestro componente padre y se la pasamos a Searchbar que es su componente hijo. Que busca un Pokemon en especifico. */
  const onSearch = async (pokemon) => {
    /* Si no hay pokemones, llamamos a la funcion que busca a todos los pokemones. */
    if (!pokemon) {
      return fetchPokemons()
    }
    setLoading(true)
    setNotFound(false)
    setSearching(true)
    const results = await searchPokemon(pokemon)
    /* Si no hay resultados, seteamos el NotFound como verdadero y el Loading como falso. Si hay resultado, seteamos los pokemones con los resultados. */
    if(!results) {
      setNotFound(true)
      setLoading(false)
      return
    } else {
      setPokemons([results])
      /* Seteamos la pagina como la principal y el total en uno porque hay un solo pokemon. */
      setPage(0)
      setTotal(1)
    }
    setLoading(false)
    setSearching(false)
  }

  return (
    /* Agrego el useContext a mi codigo y le agrego su valor, la informacion que vamos a obtener. En este caso seria favoritePokemons que le vamos a pasar el Estado que creamos, favorites y el updateFavoritePokemons con una funcion que vamos a crear con el mismo nombre. */
    <FavoriteProvider value={{
      favoritePokemons: favorites, 
      updateFavoritePokemons: updateFavoritePokemons
    }}>
      <div>
        <Navbar />
        <div className="App">
          <Searchbar onSearch={onSearch} />
          {/* Utilizamos el ternario para decir que si NotFound es verdadero, nos diga que no se encontro el pokemon, en caso que sea falso, llama al componente Pokedex. */}
          {notFound ? (
            <div>No se encontro el Pokemon que buscabas 😭</div>
          ) : (
            /* Le pasamos como prop al componente hijo la informacion que queremos que trabaje. */
            <Pokedex
              loading={loading}
              pokemons={pokemons}
              page={page}
              setPage={setPage}
              total={total}
            />
          )}
        </div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
