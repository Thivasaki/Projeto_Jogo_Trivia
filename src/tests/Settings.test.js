import React from 'react';
import { screen } from '@testing-library/react';
import Settings from '../pages/Settings';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando o componente Settings', () => {
  test('testa se o header /Configurações/ é renderizado na pagina', () => {
    renderWithRouterAndRedux(<Settings />);

    expect(
      screen.getByRole('heading', { level: 1, name: /configurações/i })
      ).toBeInTheDocument();
  })

});