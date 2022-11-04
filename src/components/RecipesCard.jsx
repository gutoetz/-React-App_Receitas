import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function RecipesCard(infos) {
  const { cardInfo, type, name, index, idRoute, title } = infos;

  return (
    <Link to={ `/${title}/${cardInfo[idRoute]}` } style={ { textDecoration: 'none' } }>
      <Card>
        <CardActionArea data-testid={ `${index}-recipe-card` }>
          <CardMedia
            component="img"
            height="140"
            image={ cardInfo[type] }
            alt="RecipepImg"
            onClick={ () => selectedRevenue() }
            data-testid={ `${index}-card-img` }
            aria-hidden="true"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              data-testid={ `${index}-card-name` }
            >
              {cardInfo[name]}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default RecipesCard;
