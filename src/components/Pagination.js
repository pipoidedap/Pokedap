import React from "react";

const Pagination = (props) => {

  /* Como props quedan las variables que nosotros le estamos pasando. */
	const {onLeftClick, onRightClick, page, totalPages} = props

  return (
    <div className="pagination">
      {/* Si le damos click llama a la funcion onLeftClick que se encuentra en el componente Pokedex.*/}
      <button className="pagination-btn" onClick={onLeftClick}>
        <div>
          <span role='img' aria-label="left">
            👈
          </span>
        </div>
      </button>
      <div>
        {page} de {totalPages}
      </div>
      {/* Si le damos click llama a la funcion onRightClick que se encuentra en el componente Pokedex.*/}
      <button onClick={onRightClick} className='pagination-btn'>
        <div>
          <span role='img' aria-label="right">
            👉
          </span>
        </div>
      </button>
    </div>
  );
};

export default Pagination;
