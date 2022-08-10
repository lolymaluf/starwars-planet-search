import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contextOfPlanets from './ContextOfPlanets';

function ProviderOfPlanets({ children }) {
  const [filteredByName, setFilteredByName] = useState('');
  const [filteredByNumber, setFilteredByNumber] = useState([]);
  const [planets, setPlanets] = useState([]);

  return (
    <contextOfPlanets.Provider
      value={ {
        filteredByName,
        setFilteredByName,
        filteredByNumber,
        setFilteredByNumber,
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
