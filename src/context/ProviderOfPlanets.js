import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contextOfPlanets from './ContextOfPlanets';

function ProviderOfPlanets({ children }) {
  const [filteredByName, setfilteredByName] = useState('');
  const valueFilter = {
    filterByName: { name: filteredByName },
    setfilteredByName,
  };

  const [filteredByNumber, setfilteredByNumber] = useState({
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0 });
  const valueNumber = {
    filterByNumber: { filteredByNumber },
    setfilteredByNumber,
  };

  const [filtros, setfilterButton] = useState([]);

  /*   const valueButton = {
    filterByButton: { filteredByButton },
    setfilterButton,
  }; */

  return (
    <contextOfPlanets.Provider
      value={ {
        ...valueFilter, ...valueNumber, filtros, setfilterButton,
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
