import React, { useContext, useState, useEffect } from 'react';
import RequestApi from '../services/RequestApi';
import contextOfPlanets from '../context/ContextOfPlanets';

/* criar novo estado pra armazenar as info */
/* const filterOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
]; */

const NumericFilter = () => {
  const {
    filteredByNumber,
    setFilteredByNumber,
    setPlanets,
  } = useContext(contextOfPlanets);

  const [initial, setInitial] = useState([]);

  const [createForm, setCreateForm] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: '0',
  });

  const [filterOptions, setFilterOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const fetchEndpoint = async (url) => {
    const data = await RequestApi(url);
    setInitial(data.results);
  };

  useEffect(() => {
    fetchEndpoint(endpoint);
    /* console.log('planets', planets); */
  }, []);

  useEffect(() => {
    setCreateForm({ ...createForm, columnFilter: filterOptions[0] });
    /* console.log('planets', planets); */
  }, [filterOptions]);

  useEffect(() => {
    const availableFilterOptions = () => {
      const optionsFilter = filterOptions
        .filter((filterOption) => (filteredByNumber
          .every(({ columnFilter }) => columnFilter !== filterOption)));
      setFilterOptions(optionsFilter);
    };
    availableFilterOptions();
    /* console.log('planets', planets); */
  }, [filteredByNumber]);

  const removeOneFilter = ({ target }) => {
    setPlanets(initial);
    /*     console.log('target.name', target.name); */
    const pegaFiltros = filteredByNumber
      .filter((ftr) => ftr.columnFilter !== target.name);
    /*     console.log('pegaFiltros', pegaFiltros); */
    setFilteredByNumber(pegaFiltros);
  };

  const resetFilters = () => {
    setFilteredByNumber([]);
  };

  /* console.log('filtros', filteredByNumber); */

  const handleSubmit = () => {
    /*     e.preventDefault();
    const filter = { */
    /*           columnFilter: e.target.columnFilter?.value,
      comparisonFilter: e.target.comparisonFilter?.value,
      valueFilter: parseInt(e.target.valueFilter?.value, 10),
    }; */
    /* setCreateForm({ ...createForm, columnFilter: filterOptions[0] }); */
    /* availableFilterOptions(); */
    setFilteredByNumber(((prevState) => ([...prevState, createForm])));
  /*     setFilteredByNumber((prevState) => ([...prevState, filter])); */
  };

  const handleChange = (e) => {
    e.preventDefault();
    const filter = {
      [e.target.name]: e.target.value,
    };
    setCreateForm({ ...createForm, ...filter });
  };

  return (
    <div>
      <h3>Numeric Filter</h3>
      <form>
        <label htmlFor="columnFilter">
          Column Filter
          <select
            id="columnFilter"
            data-testid="column-filter"
            name="columnFilter"
            onChange={ handleChange }
          >
            {filterOptions
              .map((filterOption) => (
                <option
                  key={ filterOption }
                  value={ filterOption }
                >
                  {filterOption}
                </option>))}
          </select>
        </label>
        <label htmlFor="comparisonFilter">
          Comparison Filter
          <select
            id="comparisonFilter"
            data-testid="comparison-filter"
            name="comparisonFilter"
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          name="valueFilter"
          id="inputNumber"
          data-testid="value-filter"
          type="number"
          defaultValue="0"
          onChange={ handleChange }
        />
        <button
          name="buttonNumber"
          type="button"
          data-testid="button-filter"
          onClick={ handleSubmit }
        >
          Filtrar
        </button>
      </form>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ resetFilters }
      >
        Reset Filters
      </button>
      {filteredByNumber.map(({ columnFilter, comparisonFilter, valueFilter }) => (
        <div key={ columnFilter } data-testid="filter">
          <p>
            {`${columnFilter} ${comparisonFilter} ${valueFilter} `}
            <button
              name={ columnFilter }
              type="button"
              onClick={ removeOneFilter }
            >
              x
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default NumericFilter;

/*         <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */

/*  embaixo </form>     {filteredByNumber.length > 0
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
           */
