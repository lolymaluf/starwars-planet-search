import React, { useContext, useState, useEffect } from 'react';
import RequestApi from '../services/RequestApi';
import contextOfPlanets from '../context/ContextOfPlanets';

/* criar novo estado pra armazenar as info */
const NumericFilter = () => {
  const {
    filterByNumber,
    setfilteredByNumber,
    filtros,
    setfilterButton,
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
    const pegaFiltros = filtros.filter((ftr) => ftr.columnFilter !== target.name);
    console.log('pegaFiltros', pegaFiltros);
    setfilterButton(pegaFiltros);
  };

  const handleClick = () => {
    console.log('filtro', filterByNumber.filteredByNumber);
    setfilterButton([...filtros, filterByNumber.filteredByNumber]);
  };
  const resetFilters = () => {
    setfilterButton([]);
  };
  return (
    <div>
      <h3>Numeric Filter</h3>
      <select
        data-testid="column-filter"
        name="columnFilter"
        onChange={ ({ target }) => setfilteredByNumber(
          { ...filterByNumber.filteredByNumber, columnFilter: target.value },
        ) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparisonFilter"
        onChange={ ({ target }) => setfilteredByNumber(
          { ...filterByNumber.filteredByNumber, comparisonFilter: target.value },
        ) }
        /* onChange={ console.log('filtro', filterByNumber.filteredByNumber.comparisonFilter) } */
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        name="inputNumber"
        id="inputNumber"
        value={ filterByNumber.filteredByNumber.valueFilter }
        data-testid="value-filter"
        type="number"
        onChange={ ({ target }) => setfilteredByNumber(
          { ...filterByNumber.filteredByNumber, valueFilter: target.value },
        ) }
      />
      <button
        name="buttonNumber"
        type="submit"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
      {filtros.length > 0
      && filtros.map((filtro, index) => (
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
