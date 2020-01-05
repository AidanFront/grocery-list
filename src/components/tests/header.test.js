import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from "../header";

afterEach(cleanup);

test('intergration rendering test of home page', () => {
  const { debug, container } = render(<Header />);

  expect(container.firstChild).toMatchSnapshot();
})