import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import GlobalContext from '../../context/GlobalContext';

const renderWithRouter = (component, route = '/', contextValue) => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <GlobalContext.Provider value={ contextValue }>
        <Router history={ history }>
          {component}
        </Router>
        ,
      </GlobalContext.Provider>,
    ),
    history,
  };
};

export default renderWithRouter;
