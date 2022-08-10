import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contextOfPlanets from './ContextOfPlanets';

function ProviderOfPlanets({ children }) {
  const [filteredByName, setFilteredByName] = useState('');
  const [filteredByNumber, setFilteredByNumber] = useState([]);
  const [columnSort, setColumnSort] = useState();
  const [planets, setPlanets] = useState([]);

  const filterOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const sortableColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  return (
    <contextOfPlanets.Provider
      value={ {
        filteredByName,
        setFilteredByName,
        filteredByNumber,
        setFilteredByNumber,
        filterOptions,
        columnSort,
        setColumnSort,
        sortableColumns,
        planets,
        setPlanets,
      } }
    >
      {children}
    </contextOfPlanets.Provider>
  );
}

export default ProviderOfPlanets;

ProviderOfPlanets.propTypes = {
  children: PropTypes.node.isRequired,
};
