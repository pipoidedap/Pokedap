import React, { useContext } from "react";
import FavoriteContext from "../contexts/FavoriteContext";

const Pokemon = (props) => {
  
  /* Como las props es una lista, se lo asignamo al pokemon.  */
  /* const pokemons = props.pokemons */
  const { pokemon } = props;

  /* Traigo los datos que quiero en base al useContext */
  const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext)

  const redHeart = '❤️'
  const blackHeart = '🖤'
  /* Es igual a que si favoritePokemons incluye su nombre, con el ternario le digo de que color tiene que ser su corazon. */
  const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart

  /* Cambia el color del corazon del Pokemon elegido en base a su nombre, que mapeamos en App con updateFavoritePokemons. */
  const clickHeart = (e) => {
    e.preventDefault()
    updateFavoritePokemons(pokemon.name)
  }

  return (
		/* El div principal va a ser la Card de cada Pokemon. */
    <div className="pokemon-card">
      <div className="pokemon-img-container">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-img"/>
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div># {pokemon.id}</div>
        </div>
        <div className="card-bottom">
					<div className="pokemon-type">
						{/* Hago un mapeo para conocer la ubicacion y que tipo de pokemon es. */}
						{pokemon.types.map((type, index) => {
							return(
								<div key={index} className="pokemon-type-text">{type.type.name}</div>
							)
						})}
					</div>
          <button onClick={clickHeart}>
            <div className="pokemon-favorite">
              {heart}
            </div>
          </button>
				</div>
      </div>
    </div>
  );
};

export default Pokemon;
