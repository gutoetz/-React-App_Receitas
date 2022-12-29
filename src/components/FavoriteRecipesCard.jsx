import React, { useState, useContext } from 'react';
import { CardMedia, Link, ButtonGroup,
  Typography, Button, CardActions, Card, CardContent } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GlobalContext from '../context/GlobalContext';

function FavoriteRecipesCard(infos) {
  const { favoriteRecipes, setFavoriteRecipes } = useContext(GlobalContext);
  const {
    index,
    recipes: {
      type,
      nationality,
      image,
      name,
      category,
      alcoholicOrNot,
      id,
    },
  } = infos;
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    setCopied(true);
  };

  const deleteFavorite = (favoriteId) => {
    const newList = favoriteRecipes
      .filter(({ id: filterID }) => filterID !== favoriteId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
    setFavoriteRecipes(newList);
  };

  return (
    <Card sx={ { width: 355, my: 2, p: 2 } }>
      <Link href={ `/${type}s/${id}` }>
        <CardMedia
          image={ image }
          alt="ReceiptImg"
          data-testid={ `${index}-horizontal-image` }
          sx={ { height: 140 } }
        />
      </Link>
      <CardContent>
        <Link href={ `/${type}s/${id}` } underline="none">
          <Typography
            variant="h4"
            data-testid={ `${index}-horizontal-name` }
          >
            {name}

          </Typography>
        </Link>

        <Typography
          variant="subtitle1"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {type}

        </Typography>

        <Typography variant="h5" data-testid={ `${index}-horizontal-top-text` }>
          {`${nationality} - ${category}`}
        </Typography>

        { alcoholicOrNot && (
          <Typography data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </Typography>
        ) }

      </CardContent>
      <CardActions>
        <ButtonGroup
          size="large"
          orientation="horizontal"
          aria-label="horizontal contained button group"
          fullWidth
          color="primary"
          sx={ {
            mt: 0.5,
            maxWidth: 360,
          } }
        >
          <Button
            fullWidth
            variant="contained"
            onClick={ () => deleteFavorite(id) }
          >
            <FavoriteIcon
              alt="Favorite Button"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </Button>
          <Button
            fullWidth
            onClick={ () => copyToClipBoard() }
            data-testid={ `${index}-horizontal-share-btn` }
            variant="contained"
          >
            {copied ? ('Link copied!') : (
              <ShareIcon
                alt="Share Button"

              />
            )}
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}

export default FavoriteRecipesCard;
