import React from 'react';

function RevenueCard(infos) {
  const { cardInfo, type, name, index } = infos;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{cardInfo[name]}</h4>
      <img
        src={ cardInfo[type] }
        alt="ReceiptImg"
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

export default RevenueCard;
