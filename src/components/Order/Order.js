import React from 'react';

import classes from './Order.css';

const order = (props) => {
  const ingredients = [];

  for (let ingName in props.ingredients) {
    ingredients.push(
      {
          name: ingName,
          amount: props.ingredients[ingName]
      }
    );
  }

  const ingredientOutput = ingredients.map(ing => {
    return <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        textAlign: 'center',
        margin: '2px 5px',
        border: '1px solid #ccc',
        width: '90px',
        padding: '4px 2px'
      }}
      key={ing.name}>{ing.name} ({ing.amount})</span>
      });

  return (
    <div className={classes.Order}>
      <p>Ingredients:</p>
      <p>{ingredientOutput}</p>
      <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;


