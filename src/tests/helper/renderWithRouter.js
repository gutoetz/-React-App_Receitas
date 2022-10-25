import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import GlobalProvider from '../../context/GlobalProvider';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Router history={ history }>
        <GlobalProvider>
          {component}
        </GlobalProvider>
      </Router>,
    ),
    history,
  };
};

export default renderWithRouter;
