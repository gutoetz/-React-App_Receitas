import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard(infos) {
  const { index, recipes: { type, nationality, tags, image, name,
    category, doneDate, alcoholicOrNot, id } } = infos;
  const [copied, setCopied] = useState(false);

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);
    setCopied(true);
  };
  // const history = useHistory();
  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <h6 data-testid={ `${index}-horizontal-top-text` }>{type}</h6>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {doneDate}
      </p>
      {
        alcoholicOrNot && (
          <p data-testid={ `${index}-horizontal-top-text` }>
            {alcoholicOrNot}
          </p>
        )
      }
      <Link to={ `/${type}s/${id}` }>
        <img
          src={ image }
          alt="ReceiptImg"
          data-testid={ `${index}-horizontal-image` }
          width="300px"
        />
      </Link>

      <img
        src={ shareIcon }
        alt="Share Button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => copyToClipBoard() }
        aria-hidden="true"
      />
      {copied && <p>Link copied!</p>}
      {
        tags && tags.map((tagName) => (
          <p
            key={ tagName }
            data-testid={ `${index}-${tagName}-horizontal-tag` }
          >
            {tagName}
          </p>
        ))
      }

    </div>

  );
}

export default DoneRecipesCard;
