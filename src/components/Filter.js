import React, { useContext } from 'react';
import contextOfPlanets from '../context/ContextOfPlanets';

const FilterPlanets = () => {
  <h3>Filter</h3>;
  const { filteredByName, setFilteredByName } = useContext(contextOfPlanets);

  const handleChange = ({ target: { value } }) => {
    setFilteredByName(value);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtrar por Nome"
        onChange={ handleChange }
        value={ filteredByName }
      />
    </div>
  );
};

export default FilterPlanets;
