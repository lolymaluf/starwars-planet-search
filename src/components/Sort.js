import React, { useContext, useState } from 'react';
import contextOfPlanets from '../context/ContextOfPlanets';

const Sort = () => {
  const {
    setColumnSort,
    sortableColumns,
  } = useContext(contextOfPlanets);

  const [createSort, setCreateSort] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleSubmit = () => {
    /*     e.preventDefault();
    setColumnSort({
      column: e.target.columnSort?.value,
      sort: e.target.sort?.value,
    }); */
    setColumnSort({ ...createSort });
  };

  const handleChange = (e) => {
    /* e.preventDefault(); */
    const sort = {
      [e.target.name]: e.target.value,
    };
    setCreateSort({ ...createSort, ...sort });
  };

  return (
    <form>
      <h3>Sort</h3>
      <select
        data-testid="column-sort"
        name="column"
        onChange={ handleChange }
      >
        {sortableColumns
          .map((column) => (
            <option
              key={ `columnSort-${column}` }
              value={ column }
            >
              {column}
            </option>))}
      </select>
      <label htmlFor="asc">
        <input
          type="radio"
          id="asc"
          name="sort"
          value="ASC"
          defaultChecked
          data-testid="column-sort-input-asc"
          onChange={ handleChange }
        />
        Ascendente
      </label>
      <label htmlFor="desc">
        <input
          type="radio"
          id="desc"
          name="sort"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ handleChange }
        />
        Descendente
      </label>
      <button
        name="columnSortNumber"
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSubmit }
      >
        Ordenar
      </button>
    </form>
  );
};

export default Sort;
