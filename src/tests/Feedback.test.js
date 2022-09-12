import React from 'react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando o componente Feedback', () => {
  test('Testa se tem o data-testid /feedback-text/', () => {
    renderWithRouterAndRedux(<Feedback />, {},);

    const verifyTestid = screen.getByTestId('btn-settings');
    expect(verifyTestid).toBeDefined();
  })

  test('test se o texto well done é renderizado na pagina', () => {
    renderWithRouterAndRedux(<Feedback />, {},);
    
    const textFeedback = screen.getByText(/well done/i);
    expect(textFeedback).toBeInTheDocument()
  })

});