import React, { useContext } from "react";
import FavoriteContext from "../contexts/FavoriteContext";

const Navbar = () => {

  /* Constante que guarda el URL de la imagen. */
  const imgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

	/* Arriba ya llamamos para poder utilizar el useContext, ahora creo favoritePokemons y le paso el FavoriteContext llamando desde el useContext*/
	const { favoritePokemons } = useContext(FavoriteContext)
	console.log(favoritePokemons)

  return (
    <nav>
      <div />
      {/* El DIV guarda la imagen */}
      <div>
        <img src={imgUrl} alt="pokeapi-logo" className="navbar-image" />
      </div>
      {/* El DIV guarda un logo para los futuros pokemones que quiera guardar y le paso su cantidad en base a la longitud de mi array. */}
      <div>💖{favoritePokemons.length}</div>
    </nav>
  );
};

export default Navbar;
