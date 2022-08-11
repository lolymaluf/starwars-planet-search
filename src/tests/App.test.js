import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const prResolve = Promise.resolve(testData)

describe('Testando Aplicativo Star Wars', () => {


  beforeEach(async() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => prResolve});
    render(<App />);
    await act(async () => {await prResolve});
  });

  afterEach(() => jest.restoreAllMocks());

  test('I am your test', () => {
    const testPlanet = screen.getByRole('cell', {  name: /alderaan/i});
    expect(testPlanet).toBeInTheDocument();
  });

  test ('Testa setFilteredByName filter.js', async () => {
    const testsetFilteredByName = screen.getByTestId('name-filter');
    expect(testsetFilteredByName).toBeInTheDocument();
    userEvent.type(testsetFilteredByName, 'Alderaan');
    const testPlanet = await screen.findByRole('cell', {name: /alderaan/i});
    /* console.log('log teste', testsetFilteredByName.value); */
    expect(testPlanet).toBeInTheDocument();
  });


  test('Testa filtros', async () => {
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
    userEvent.clear(testSpinButton);

    userEvent.selectOptions(testColumnFilter, 'diameter');
    userEvent.selectOptions(testComparisionFilter, 'menor que');
    userEvent.type(testSpinButton, '12000')
    userEvent.click(testButtonFilter);
    userEvent.clear(testSpinButton);

    userEvent.selectOptions(testColumnFilter, 'surface_water');
    userEvent.selectOptions(testComparisionFilter, 'igual a');
    userEvent.type(testSpinButton, '8')
    userEvent.click(testButtonFilter);
    userEvent.clear(testSpinButton);

    const removeOneFilter = screen.getAllByRole('button', { name: /x/i });
    
    userEvent.click(removeOneFilter[0]);
    
    const resultDagobah = await screen.findByRole('cell', {  name: /dagobah/i});
    const resultEndor = await screen.findByRole('cell', {  name: /endor/i})
    const resultYavinIV = await screen.findByRole('cell', {  name: /yavin iv/i})

    expect(resultDagobah).toBeInTheDocument();
    expect(resultEndor).toBeInTheDocument();
    expect(resultYavinIV).toBeInTheDocument();

    const resetAllFilters = screen.getByRole('button', {  name: /reset filters/i});
    userEvent.click(resetAllFilters);

  });

  test ('Testa Sort 1', () => {
    const sortCombobox = screen.getByTestId('column-sort');
    const sortAsc = screen.getByRole('radio', {  name: /ascendente/i});
    const sortOrdenar = screen.getByRole('button', {  name: /ordenar/i});

    userEvent.selectOptions(sortCombobox, 'population');
    userEvent.click(sortAsc);
    userEvent.click(sortOrdenar);

  });

  test ('Testa Sort 2', () => {
    const sortCombobox = screen.getByTestId('column-sort');
    const sortDsc = screen.getByRole('radio', {  name: /descendente/i});
    const sortOrdenar = screen.getByRole('button', {  name: /ordenar/i});

    userEvent.selectOptions(sortCombobox, 'population');
    userEvent.click(sortDsc);
    userEvent.click(sortOrdenar);

  });


});

