import React from 'react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from "@testing-library/react";

describe('Testando o componente Feedback', () => {
  test('Testa o texto com o assertions = 3', () => {
    renderWithRouterAndRedux(<Feedback />, {
        player: {
          name: '',
          assertions: 3,
          score: 0,
          gravatarEmail: '',
        }
    },);

    // const verifyTestid = screen.getByTestId('feedback-text');
    // expect(verifyTestid).toBeInTheDocument();
    // expect(verifyTestid).toHaveTextContent('Could be better...')
    expect(screen.getByText('Well Done!')).toBeInTheDocument();
  })
  test('Testa o texto com o assertions = 0', () => {
    renderWithRouterAndRedux(<Feedback />, {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        }
    },);

    // const verifyTestid = screen.getByTestId('feedback-text');
    // expect(verifyTestid).toBeInTheDocument();
    // expect(verifyTestid).toHaveTextContent('Could be better...')
    expect(screen.getByText('Could be better...')).toBeInTheDocument();
  })


});