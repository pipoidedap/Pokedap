import React, { useState } from "react";

const Searchbar = (props) => {
  /* Paso onSearch como propiedad */
  const { onSearch } = props

  /* State del buscador (input) que ya cree, donde va a ir cambiando a medida que busque diferentes pokemones. */
  const [search, setSearch] = useState("");

  /* Setea el State del input que creamos con el valor del mismo. */
  const onChange = (e) => {
    setSearch(e.target.value);
    if(e.target.value.length === 0) {
      onSearch(null)
    }
  };

  /* Cuando le damos click llama a la funcion OnSearch que esta en el componente padre App. */
  const onClick = (e) => {
    onSearch(search)
  };

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        {/* Input con un placeholder que guarda un texto predictivo falso y un onChange con la funcion que esta creada arriba con el mismo nombre. */}
        <input placeholder="Buscar Pokemon..." onChange={onChange} />
      </div>
      <div className="searchbar-btn">
        {/* Boton con un onClick con la funcion que esta creada arriba con el mismo nombre. */}
        <button onClick={onClick}>Buscar</button>
      </div>
    </div>
  );
};

export default Searchbar;