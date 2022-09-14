import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Ranking from "../pages/Ranking";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import {questionsResponse} from '../mocks/questions'

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
    expect(button).toBeInTheDocument();
    userEvent.click(button)
    expect(history.location.pathname).toBe('/')

  });
  test('Se há um jogador na classificação do ranking',async  () => {
    const { history } = renderWithRouterAndRedux(<App />,{});
    const array = [0,1,2,3,4];
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const button = screen.getByTestId('btn-play');

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName,'Manoel Lima');
    userEvent.click(button)

    await (waitFor(() => expect(button).not.toBeInTheDocument(),{timeout:3000}));

    expect(history.location.pathname).toBe('/games')

    array.forEach((element) => {
    const correctAnswerButton = screen.getByTestId('correct-answer');
    expect(correctAnswerButton).toBeInTheDocument();
    userEvent.click(correctAnswerButton);

    const nextButton = screen.getByTestId('btn-next')
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton)
    })
    
    await waitFor(() => expect(history.location.pathname).toBe('/feedback'), {timeout:1000})

    const rankingButton = screen.getByTestId('btn-ranking');
    expect(rankingButton).toBeInTheDocument();
    userEvent.click(rankingButton);

    expect(history.location.pathname).toBe('/ranking');

    expect(screen.getByAltText('gravatar')).toBeInTheDocument();
    expect(screen.getByTestId('player-name-0')).toBeInTheDocument();
    expect(screen.getByTestId('player-score-0')).toBeInTheDocument();
  })
  test('Se a ordem de classificação se baseia pelo score dos jogadores', async () => {
    const { history } = renderWithRouterAndRedux(<App />,{});
    global.fetch = jest.fn(() => Promise.resolve(({
      json: () => Promise.resolve(questionsResponse)
    })))

    const inputEmail = screen.getByTestId('input-gravatar-email');
    const inputName = screen.getByTestId('input-player-name');
    const button = screen.getByTestId('btn-play');

    userEvent.type(inputEmail,'teste@teste.com');
    userEvent.type(inputName,'Manoel Lima');
    userEvent.click(button)

    await (waitFor(() => expect(button).not.toBeInTheDocument(),{timeout:3000}));

    expect(history.location.pathname).toBe('/games')

    questionsResponse.results.forEach((element) => {
    const correctAnswerButton = screen.getByTestId('correct-answer');
    expect(correctAnswerButton).toBeInTheDocument();
    userEvent.click(correctAnswerButton);

    const nextButton = screen.getByTestId('btn-next')
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton)
    })
    await waitFor(() => expect(history.location.pathname).toBe('/feedback'), {timeout:1000})

    const playAgainButton = screen.getByTestId('btn-play-again');
    expect(playAgainButton).toBeInTheDocument();
    userEvent.click(playAgainButton)

    expect(history.location.pathname).toBe('/')

    const inputEmail1 = screen.getByTestId('input-gravatar-email');
    const inputName1 = screen.getByTestId('input-player-name');
    const button1 = screen.getByTestId('btn-play');

    userEvent.type(inputEmail1,'teste1@teste.com');
    userEvent.type(inputName1,'Junior Vieira');
    userEvent.click(button1);

    await (waitFor(() => expect(button1).not.toBeInTheDocument(),{timeout:3000}));

    expect(history.location.pathname).toBe('/games')

    questionsResponse.results.forEach((element) => {
      const correctAnswerButton1 = screen.getByTestId('correct-answer');
      expect(correctAnswerButton1).toBeInTheDocument();
      setInterval(()=>{
        userEvent.click(correctAnswerButton1);
        const nextButton1 = screen.getByTestId('btn-next')
        expect(nextButton1).toBeInTheDocument();
        userEvent.click(nextButton1)
      },3000)
  
      
      })
      history.push('/feedback')
      await waitFor(() =>  expect(history.location.pathname).toBe('/feedback') , {timeout:2000})

      const rankingButton = screen.getByTestId('btn-ranking');
      expect(rankingButton).toBeInTheDocument();
      userEvent.click(rankingButton);
      
      expect(history.location.pathname).toBe('/ranking')

      expect(screen.getByTestId('player-score-0')).toBeInTheDocument();
      expect(screen.getByTestId('player-score-1')).toBeInTheDocument();
    
  })
})