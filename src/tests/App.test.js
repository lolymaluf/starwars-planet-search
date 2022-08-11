import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testando Aplicativo Star Wars', () => {

  beforeEach(async() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData)
    }));
    render(<App />);
    await act(async () => {await Promise.resolve(testData);});
  });

  afterEach(() => jest.clearAllMocks());

  test('I am your test', () => {
    const testPlanet = screen.getByRole('cell', {  name: /alderaan/i});
    expect(testPlanet).toBeInTheDocument();
  });

  test ('Testa setFilteredByName filter.js', () => {
    const testsetFilteredByName = screen.getByTestId('name-filter');
    expect(testsetFilteredByName).toBeInTheDocument();
    console.log('log teste', testsetFilteredByName);
    userEvent.type(testsetFilteredByName, 'alderaan');
    const testPlanet =  screen.findByRole('cell', {name: /alderaan/i});
    /* expect(testPlanet).toBeInTheDocument(); */
  });


  test('Testa filtros', () => {
    const testColumnFilter = screen.getByRole('combobox', {  name: /column filter/i});
    const testSpinButton = screen.getByRole('spinbutton');
    const testComparisionFilter = screen.getByRole('combobox', {  name: /comparison filter/i});
    const testButtonFilter = screen.getByRole('button', {  name: /filtrar/i});
    
    expect(testColumnFilter).toBeInTheDocument();
    expect(testComparisionFilter).toBeInTheDocument();
    expect(testSpinButton).toBeInTheDocument();
    expect(testButtonFilter).toBeInTheDocument();

    userEvent.selectOptions(testColumnFilter, 'population');
    userEvent.selectOptions(testComparisionFilter, 'maior que');
    userEvent.type(testSpinButton, '0');
    userEvent.click(testButtonFilter);

    userEvent.selectOptions(testColumnFilter, 'diameter');
    userEvent.selectOptions(testComparisionFilter, 'menor que');
    userEvent.type(testSpinButton, '12000')
    userEvent.click(testButtonFilter);

    userEvent.selectOptions(testColumnFilter, 'surface_water');
    userEvent.selectOptions(testComparisionFilter, 'igual a');
    userEvent.type(testSpinButton, '8')
    userEvent.click(testButtonFilter);

    const removeOneFilter = screen.getAllByRole('button', { name: /x/i });
    
    userEvent.click(removeOneFilter[0]);
    
    const resultDagobah = screen.findByRole('cell', {  name: /dagobah/i});
    const resultEndor = screen.findByRole('cell', {  name: /endor/i})
    const resultYavinIV = screen.findByRole('cell', {  name: /yavin iv/i})

    const resetAllFilters = screen.getByRole('button', {  name: /reset filters/i});
    userEvent.click(resetAllFilters);

  });
  


});

