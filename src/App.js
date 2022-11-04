import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';
import Copyright from './components/Copyright';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff6434',
      main: '#dd2c00',
      dark: '#a30000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffdd4b',
      main: '#ffab00',
      dark: '#c67c00',
      contrastText: '#000000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <Container
        component="main"
        maxWidth="360"
        maxHeight="640"
      >
        <Box
          sx={ {
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 360,
            maxHeight: 640,
            mx: 'auto',
          } }
        >

          <CssBaseline />
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/meals" component={ Meals } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
            <Route
              exact
              path="/meals/:id"
              render={
                () => <RecipeDetails type="meals" />
              }
            />
            <Route
              exact
              path="/drinks/:id"
              render={ () => <RecipeDetails type="drinks" /> }
            />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
          <Copyright sx={ { mt: 8, mb: 4 } } />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
