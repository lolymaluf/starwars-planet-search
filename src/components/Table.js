import React, { useState, useEffect, useContext } from 'react';
import RequestApi from '../services/RequestApi';
import contextOfPlanets from '../context/ContextOfPlanets';

const SWTable = () => {
  const [planets, setPlanets] = useState([]);

  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const fetchEndpoint = async (url) => {
    const data = await RequestApi(url);
    setPlanets(data.results);
  };

  useEffect(() => {
    fetchEndpoint(endpoint);
    /* console.log('planets', planets); */
  }, []);

  const { filterByName: { name }, filtros } = useContext(contextOfPlanets);

  const tableItems = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  const filterAll = () => {
    if (filtros.length > 0) {
      filtros.forEach((filtro) => {
        if (filtro.comparisonFilter === 'maior que') {
          /* console.log('planetas', Object.values(planets)); */
          const valoresPlanetasObj = Object.values(planets);
          const filterData = valoresPlanetasObj
            .filter((planeta) => Number(planeta[filtro.columnFilter])
            > Number(filtro.valueFilter));
          setPlanets(filterData);
          /* console.log('console de apoio:', filterData) */
        }
        if (filtro.comparisonFilter === 'menor que') {
          const valoresPlanetasObj = Object.values(planets);
          const filterData = valoresPlanetasObj
            .filter((planeta) => Number(planeta[filtro.columnFilter])
            < Number(filtro.valueFilter));
          setPlanets(filterData);
        }
        if (filtro.comparisonFilter === 'igual a') {
          /* console.log('planetas', Object.values(planets)); */
          const valoresPlanetasObj = Object.values(planets);
          const filterData = valoresPlanetasObj
            .filter((planeta) => Number(planeta[filtro.columnFilter])
            === Number(filtro.valueFilter));
          setPlanets(filterData);
        }
      });
    }
    /*     if (filtros.length < 1) {
      setPlanets()
    } */
  };

  useEffect(() => {
    filterAll();
    console.log('chamou useeffect', filtros);
  }, [filtros]);

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
          && planets.filter(({ name: planetName }) => planetName.includes(name))
            .map((item, index) => (
              <tr key={ index }>
                <td>{item.name}</td>
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
