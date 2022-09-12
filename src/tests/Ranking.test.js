import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ranking from "../pages/Ranking";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";


describe('Testando a página de Ranking',() => {
  test('Se há um titulo na página', () => {
    renderWithRouterAndRedux(<Ranking />,{});

    const title = screen.getByRole('heading', {name: /ranking/i});
    expect(title).toBeInTheDocument()
  })
  test('Se há um button que redireciona para a Home page na tela', () => {
    renderWithRouterAndRedux(<Ranking />,{});

    const button = screen.getByRole('button', {name: /logout/i});
    expect(button).toBeInTheDocument()
  })
  test('Se clicar no botão redireciona para o Login', () => {
    const { history } = renderWithRouterAndRedux(<Ranking />,{});

    const button = screen.getByRole('button', {name: /logout/i});
    userEvent.click(button)
    expect(history.location.pathname).toBe('/')

  })
})