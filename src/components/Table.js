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
  }, []);

  const { filterByName: { name } } = useContext(contextOfPlanets);

  const tableItems = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
    'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];
  return (
    <table className="table">
      <thead>
        <tr>
          {tableItems.map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {/* troca nome da variavel para nao dar conflito com name */}
        {planets
          .filter(({ name: planetName }) => planetName.includes(name))
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
          ))}
      </tbody>
    </table>
  );
};
export default SWTable;
