import React, { useContext } from 'react';
import contextOfPlanets from '../context/ContextOfPlanets';

const Sort = () => {
  const {
    setColumnSort,
    sortableColumns,
  } = useContext(contextOfPlanets);

  const handleSubmit = (e) => {
    e.preventDefault();
    setColumnSort({
      column: e.target.columnSort.value,
      sort: e.target.sort.value,
    });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <h3>Sort</h3>
      <select
        data-testid="column-sort"
        name="columnSort"
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
        />
        Descendente
      </label>
      <button
        name="columnSortNumber"
        type="submit"
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </form>
  );
};

export default Sort;
