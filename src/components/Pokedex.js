import React from "react";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";

/* A este componente hijo le vamos a pasar como argumento las props que le da el componente padre que es App */
const Pokedex = (props) => {
  /* Como las props es una lista de objetos, se lo asignamos a los pokemons y tambien traemos page y setPage para manejar el Estado que se encuentra en App  */
  /* const pokemons = props.pokemons */
  const { pokemons, page, setPage, total, loading } = props;

  /* Crea una constante que sirve para que cuando se setee el State, cambie la pagina una menos. */
  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  };

  /* Crea una constante que sirve para que cuando se setee el State, cambie la pagina una mas. */
  const nextPage = () => {
    const nextPage = Math.min(page + 1, total);
    setPage(nextPage);
  };

  return (
    <div>
      <div className="header">
        <h1>Pokedex</h1>
        {/* Paso el componente hijo de las paginas con sus props */}
        <Pagination
          page={page + 1}
          totalPages={total}
          onLeftClick={lastPage}
          onRightClick={nextPage}
        />
      </div>
      {loading ? (
        <div>
          <h1>Cargando pokemones...</h1>
        </div>
      ) : (
        <div className="pokedex-grid">
          {/* Mapeamos a nuestro arreglo, como argumento el pokemon. Por cada uno vamos a crear un div que pinte el componente hijo que creamos, Pokemon, al cual le vamos a pasar el pokemon y su key.*/}
          {pokemons.map((pokemon) => {
            return (
              /* Devuelve por cada pokemon que encuentra en el map, el camponente que le vamos a pasar con la informacion del pokemon. */
              <Pokemon pokemon={pokemon} key={pokemon.name} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Pokedex;
