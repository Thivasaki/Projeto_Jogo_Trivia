import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from "@testing-library/user-event";

describe('Testando o componente Settings', () => {

  test('testa se o header: h2 com texto /Time Is Over/ é renderizado na pagina', async () => {
    const {history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const button = screen.getByTestId('btn-play');

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName,'Manoel Lima');
    userEvent.click(button)

    await waitFor(() => {
      expect(history.location.pathname).toBe('/games')
      expect(screen.getByRole('heading', {level: 1})).toBeInTheDocument();

      setInterval(() => {
        expect(screen.getByRole('heading', {level: 2, name: 'Time Is Over'})).toBeInTheDocument()
      }, 31000)
    }, {timeout: 2000})

    
  })
});