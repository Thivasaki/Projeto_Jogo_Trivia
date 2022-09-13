import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Realiza os testes da página de Login', () => {

  test('Teste se a pagina de Login é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />,{},)

    expect(history.location.pathname).toBe('/')

  })
  test('Se há um input de name na página', () => {
    renderWithRouterAndRedux(<App />,{},)

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument()

  })
  test('Se há um input de email na página', () => {
    renderWithRouterAndRedux(<App />,{},)
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument()

  })
  test('Se há um input de botão de submit na página', () => {
    renderWithRouterAndRedux(<App />,{},)

    const button = screen.getByRole('button', {name: /play/i});
    expect(button).toBeInTheDocument()

  })
  test('Digitar no input', () => {
    renderWithRouterAndRedux(<App />,{},)

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const button = screen.getByRole('button', {name: /play/i});

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName,'Manoel Lima');
    expect(button).not.toBeDisabled();
  })

  test('Testa se existe botão de settings', () => {
    renderWithRouterAndRedux(<App />,{},)
    
    
    const btnSettings = screen.getByTestId('btn-settings');
    expect(btnSettings).toBeDefined();
  })

  test('Testa se o botão /Settings redireciona para a pagina config.../', () => {
    const { history} = renderWithRouterAndRedux(<App />,{},)

     userEvent.click(screen.getByTestId('btn-settings'));
     expect(history.location.pathname).toBe('/settings');
  })
})