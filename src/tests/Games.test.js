import { screen, waitFor } from "@testing-library/react";
import Games from "../pages/Game";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import App from '../App';
import userEvent from "@testing-library/user-event";
import { questionsResponse } from '../mocks/questions'

const questions = {
  'response_code': 0,
  'results': [
    {
      'category': "Geography",
      'correct_answer': "Canberra",
      'difficulty': "medium",
      'incorrect_answers': ['Sydney', 'Melbourne', 'Brisbane'],
      'question': "What is the capital of Australia?",
      'type': "multiple",
    },
    {
      'category': "Entertainment: Video Games",
      'correct_answer': "Barrier",
      'difficulty': "medium",
      'incorrect_answers': ['Obsidian', 'Bedrock', 'Block of Diamond'],
      'question': "What block in Minecraft has the highest blast resistance?",
      'type': "multiple",
    },
    {
      'category': "Science: Computers",
      'correct_answer': "Kibibyte",
      'difficulty': "hard",
      'incorrect_answers': ['Kylobyte', 'Kilobyte', 'Kelobyte'],
      'question': "What does the International System of Quantities refer 1024 bytes as?",
      'type': "multiple",
    },
    {
      'category': "Science & Nature",
      'correct_answer': "Malus pumila",
      'difficulty': "mediumm",
      'incorrect_answers': ['Malus americana', 'Pomus domestica', 'Appelus delectica'],
      'question': "What is the Linnean name of the domestic apple tree?",
      'type': "multiple",
    },
    {
      'category': "Entertainment: Books",
      'correct_answer': "False",
      'difficulty': "easy",
      'incorrect_answers': ['True'],
      'question': "Shub-Niggurath is a creature that was created by \tJ. R. R. Tolkien in his novel &quot;The Lord of The Rings&quot;.",
      'type': "boolean",
    },
  ]
}
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

  jest.setTimeout(50000)
  test('Verifica se os botoes das perguntas sao desabilitados apos 30 segundos ou o texto Time Is Over aparece', async () => {

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(questions),
  }));
  renderWithRouterAndRedux(<App />,{
    player: {
      name: 'Manoel',
      assertions: 0,
      score: 0,
      gravatarEmail: 'teste@teste.com'
    }
  }, "/games");
  await waitFor(() => {
    expect(screen.getByTestId('timer')).toBeInTheDocument()
  }); 
  await new Promise((interval) => setTimeout(interval, 32000));
  expect(screen.getByRole('heading', {level: 2, name: "Time Is Over"})).toBeInTheDocument();

  });

  test('Se o token é valido', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
          response_code: 3,
          results: [],
      })
    }))
    const { history }= renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const button = screen.getByTestId('btn-play');

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName,'Manoel Lima');
    userEvent.click(button)

    await (waitFor(() =>  expect(history.location.pathname).toBe('/'),{timeout:3000}));

  });

});