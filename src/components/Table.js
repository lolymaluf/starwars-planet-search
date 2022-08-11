import React, { useState, useEffect, useContext } from 'react';
import RequestApi from '../services/RequestApi';
import contextOfPlanets from '../context/ContextOfPlanets';

const SWTable = () => {
  const [initialPlanets, setInitialPlanets] = useState([]);
  const {
    filteredByName,
    filteredByNumber,
    columnSort,
    planets,
    setPlanets } = useContext(contextOfPlanets);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const fetchEndpoint = async (url) => {
    const data = await RequestApi(url);
    setPlanets(data.results);
    setInitialPlanets(data.results);
  };

  useEffect(() => {
    fetchEndpoint(endpoint);
    /* console.log('planets', planets); */
  }, []);

  const tableItems = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  const filterAll = () => {
    if (filteredByNumber.length > 0) {
      filteredByNumber.forEach((filtro) => {
        /* console.log('filtro', filtro); */
        if (filtro.comparisonFilter === 'maior que') {
          /* console.log('planetas', Object.values(planets)); */
          const valoresPlanetasObj = Object.values(planets);
          /* console.log('valoresPlanetasObj', valoresPlanetasObj); */
          const filterData = valoresPlanetasObj
            .filter((planeta) => Number(planeta[filtro.columnFilter])
            > Number(filtro.valueFilter));
          setPlanets(filterData);
          /* console.log('console de apoio:', filterData) */
        } else if (filtro.comparisonFilter === 'menor que') {
          const valoresPlanetasObj = Object.values(planets);
          const filterData = valoresPlanetasObj
            .filter((planeta) => Number(planeta[filtro.columnFilter])
            < Number(filtro.valueFilter));
          setPlanets(filterData);
        } else {
          /* console.log('planetas', Object.values(planets)); */
          const valoresPlanetasObj = Object.values(planets);
          const filterData = valoresPlanetasObj
            .filter((planeta) => Number(planeta[filtro.columnFilter])
            === Number(filtro.valueFilter));
          setPlanets(filterData);
        }
      });
    }
    if (filteredByNumber.length < 1) {
    /*       console.log('o que ta acontecendo', initialPlanets); */
      setPlanets(initialPlanets);
    }
    /*     if (filtros.length < 1) {
      setPlanets()
    } */
  };

  useEffect(() => {
    filterAll();
    /* console.log('chamou useeffect', filteredByNumber); */
  }, [filteredByNumber]);

  const menor = -1;
  const maior = 1;

  const sortFn = (a, b) => {
    if (!columnSort) {
      return a.name.localeCompare(b.name);
    }
    /*     if (a[columnSort.column] === b[columnSort.column]) {
      return 0;
    } */
    console.log('log columm sort', columnSort);
    if (a[columnSort.column] === 'unknown') {
      return maior;
    }
    if (b[columnSort.column] === 'unknown') {
      return menor;
    }
    return (a[columnSort.column] - b[columnSort.column])
      * (columnSort.sort === 'ASC' ? maior : menor);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {tableItems.map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {
          planets
          && planets.filter(({ name: planetName }) => planetName.includes(filteredByName))
            .sort(sortFn)
            .map((item, index) => (
              <tr key={ index }>
                <td
                  data-testid="planet-name"
                >
                  {item.name}
                </td>
                <td>{item.rotation_period}</td>
                <td>{item.orbital_period}</td>
                <td>{item.diameter}</td>
                <td>{item.climate}</td>
                <td>{item.gravity}</td>
                <td>{item.terrain}</td>
                <td>{item.surface_water}</td>
                <td>{item.population}</td>
                <td>{item.films}</td>
                <td>{item.created}</td>
                <td>{item.edited}</td>
                <td>{item.url}</td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
};
export default SWTable;
