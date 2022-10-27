import React from 'react';
import { useHistory } from 'react-router-dom';

function RevenueCard(infos) {
  const { cardInfo, type, name, index, id } = infos;
  const history = useHistory();

  function selectedRevenue(id) {
    history.push(`/meals/${id}`);
  }
  
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{cardInfo[name]}</h4>
      <img
        src={ cardInfo[type] }
        alt="ReceiptImg"
        data-testid={ `${index}-card-img` }
        id={ id }
        onClick={ () => selectedRevenue(id) }
        aria-hidden="true"
      />
    </div>
  );
}

export default RevenueCard;
