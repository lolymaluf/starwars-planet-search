import React, { useState } from 'react';
import PropTypes from 'prop-types';
import contextOfPlanets from './ContextOfPlanets';

function ProviderOfPlanets({ children }) {
  const [filteredByName, setfilteredByName] = useState('');
  const valueFilter = {
    filterByName: { name: filteredByName },
    setfilteredByName,
  };

  return (
    <contextOfPlanets.Provider value={ valueFilter }>
      {children}
    </contextOfPlanets.Provider>
  );
}

export default ProviderOfPlanets;

ProviderOfPlanets.propTypes = {
  children: PropTypes.element.isRequired,
};
