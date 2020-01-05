import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from "../home";
import Header from "../header";

afterEach(cleanup);

test('intergration rendering test of home page', () => {
  const { debug, queryByTestId, container } = render(<Home />);

  //Sub component <Header/> Renders
  expect(queryByTestId('header-component')).toBetruthy;
  //Grocery <List/> Renders 
  expect(queryByTestId('list-component')).toBetruthy;

  expect(container.firstChild).toMatchSnapshot();
})