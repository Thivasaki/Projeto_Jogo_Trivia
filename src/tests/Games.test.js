import { screen } from "@testing-library/react";
import Games from "../pages/Games";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Realiza os testes da página de Games', () => {
  test('Se tem uma imagem de gravatar', () => {
    renderWithRouterAndRedux(<Games />,{},)
    const alt  = /Gravatar/i;
    const altImage = screen.getByAltText(alt)
    expect(altImage).toBeInTheDocument();

  });
  test('Se há o data-testid /header-player-name/', () => {
    renderWithRouterAndRedux(<Games />,{},)
    const playerName = screen.getByTestId('header-player-name');
    expect(playerName).toBeInTheDocument()

  });
  test('Se as perguntas são renderizadas na tela', () => {
    renderWithRouterAndRedux(<Games />,{},)
    const answers = screen.getByTestId('answer-options');
    expect(answers).toBeInTheDocument()

  });
  test('Se as perguntas são renderizadas na tela', () => {
    renderWithRouterAndRedux(<Games />,{},)
    const answars = screen.getByText(/score/i);
    expect(answars).toBeInTheDocument()
  });
  test('Verifica seo history ta renderizando pra home', () => {
    const { history } = renderWithRouterAndRedux(<Games />,{},);
    expect(history.location.pathname).toBe('/')
  });
  test('teste', () => {
   renderWithRouterAndRedux(<Games />,{},);

  });
});