import React, { useContext } from 'react';
import contextOfPlanets from '../context/ContextOfPlanets';

const FilterPlanets = () => {
  <h3>Filter</h3>;
  const { filterByName: { name }, setfilteredByName } = useContext(contextOfPlanets);

  const handleChange = ({ target: { value } }) => {
    setfilteredByName(value);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar por Nome"
        onChange={ handleChange }
        value={ name }
      />
    </div>
  );
};

export default FilterPlanets;