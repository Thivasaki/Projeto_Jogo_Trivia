import React from 'react';
import TimeIsOverMessage from '../pages/Settings';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando o componente Settings', () => {
  test('testa se o header: h2 com texto /Time Is Over/ é renderizado na pagina', () => {
    renderWithRouterAndRedux(<TimeIsOverMessage />);

    expect(
      screen.getByRole('heading', { level: 2 })
      ).toBeInTheDocument();
  })

});