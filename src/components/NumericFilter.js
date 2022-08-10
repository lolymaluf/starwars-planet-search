import React, { useContext, useState, useEffect } from 'react';
import RequestApi from '../services/RequestApi';
import contextOfPlanets from '../context/ContextOfPlanets';

/* criar novo estado pra armazenar as info */
const filterOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const NumericFilter = () => {
  const {
    filteredByNumber,
    setFilteredByNumber,
    setPlanets,
  } = useContext(contextOfPlanets);

  const [initial, setInitial] = useState([]);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const fetchEndpoint = async (url) => {
    const data = await RequestApi(url);
    setInitial(data.results);
  };

  useEffect(() => {
    fetchEndpoint(endpoint);
    /* console.log('planets', planets); */
  }, []);

  const removeOneFilter = ({ target }) => {
    setPlanets(initial);
    console.log('target.name', target.name);
    const pegaFiltros = filteredByNumber
      .filter((ftr) => ftr.columnFilter !== target.name);
    console.log('pegaFiltros', pegaFiltros);
    setFilteredByNumber(pegaFiltros);
  };

  const resetFilters = () => {
    setFilteredByNumber([]);
  };

  console.log('filtros', filteredByNumber);

  const availableFilterOptions = filterOptions
    .filter((filterOption) => (filteredByNumber
      .every(({ columnFilter }) => columnFilter !== filterOption)));

  const handleSubmit = (e) => {
    e.preventDefault();
    const filter = {
      columnFilter: e.target.columnFilter.value,
      comparisonFilter: e.target.comparisonFilter.value,
      valueFilter: parseInt(e.target.valueFilter.value, 10),
    };

    setFilteredByNumber((prevState) => ([...prevState, filter]));
  };

  return (
    <div>
      <h3>Numeric Filter</h3>
      <form onSubmit={ handleSubmit }>
        <select
          data-testid="column-filter"
          name="columnFilter"
        >
          {availableFilterOptions
            .map((filterOption) => (
              <option
                key={ filterOption }
                value={ filterOption }
              >
                {filterOption}
              </option>))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
        /* onChange={ console.log('filtro', filterByNumber.filteredByNumber.comparisonFilter) } */
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="valueFilter"
          id="inputNumber"
          data-testid="value-filter"
          type="number"
          defaultValue="0"
        />
        <button
          name="buttonNumber"
          type="submit"
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      {filteredByNumber.length > 0
      && filteredByNumber.map((filtro, index) => (
        <div
          key={ index }
          data-testid="filter"
        >
          <p>
            { filtro.columnFilter }
            _
            { filtro.comparisonFilter }
            _
            { filtro.valueFilter }
          </p>
          <button
            name={ filtro.columnFilter }
            type="button"
            onClick={ removeOneFilter }
          >
            x
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ resetFilters }
      >
        Reset Filters
      </button>
    </div>
  );
};
export default NumericFilter;

/*         <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */
