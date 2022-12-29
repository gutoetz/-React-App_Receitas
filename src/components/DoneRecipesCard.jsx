import React, { useState } from 'react';
import { CardMedia, Link,
  Typography, Button, CardActions, Card, CardContent } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

function DoneRecipesCard(infos) {
  const {
    index,
    recipes: {
      type,
      nationality,
      tags,
      image,
      name,
      category,
      doneDate,
      alcoholicOrNot,
      id,
    },
  } = infos;

  const [copied, setCopied] = useState(false);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    setCopied(true);
  };

  return (
    <Card sx={ { width: 355, my: 2, p: 2 } }>
      <Link href={ `/${type}s/${id}` } underline="none">
        <CardMedia
          sx={ { height: 140 } }
          image={ image }
          title="ReceiptImg"
          data-testid={ `${index}-horizontal-image` }
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
          <Typography variant="h5" data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </Typography>
        ) }
        { tags && tags.map((tagName) => (
          <Typography
            variant="h5"
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            {tagName}
          </Typography>
        )) }
        <Typography variant="subtitle2" data-testid={ `${index}-horizontal-done-date` }>
          {doneDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained">
          {copied ? ('Link copied!') : (
            <ShareIcon
              alt="Share Button"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => copyToClipBoard() }
            />
          )}
        </Button>
      </CardActions>
    </Card>

  );
}

export default DoneRecipesCard;
