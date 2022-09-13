import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from "@testing-library/user-event";

describe('Testando o componente Settings', () => {

  beforeEach(() => {
    jest.useFakeTimers(30000);
  });
  test('testa se o header: h2 com texto /Time Is Over/ é renderizado na pagina', async () => {
    const {history } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const button = screen.getByRole('button', {name: /play/i});

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName,'Manoel Lima');
    userEvent.click(button)
    
    history.push('/games')
    // expect(screen.queryByRole('heading', {name: 'Time Is Over'})).not.toBeInTheDocument();

    const timer = screen.getByRole('heading', {level: 1})

    setInterval(() => {

    },30000)  
    
    await waitForElementToBeRemoved(() => timer,);
      expect(await screen.findByText(/Time Is Over/i)).toBeInTheDocument();
  })
});