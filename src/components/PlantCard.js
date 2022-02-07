import React, { useState } from "react";

function PlantCard({ id, name, image, price, onDeletePlant, onChangePrice }) {
  const [ changedPrice, setChangePrice ] = useState(price);
  const [ isInStock, setIsInStock ] = useState(true);
  const isInStockBtn = isInStock 
    ? <button className="primary" onClick = {() => setIsInStock(!isInStock)}>In Stock</button> 
    : <button onClick = {() => setIsInStock(!isInStock)}>Out of Stock</button>;

  function handleDelete () {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE',
    })
      .then(r => r.json())
      .then( () => onDeletePlant(id));
  }

  function handleChangePrice (e) {
    const plant = {
      id: id,
      name: name,
      image: image,
      price: parseFloat(e.target.value),
    };
    setChangePrice(parseFloat(e.target.value));

    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plant),
    })
      .then(r => r.json())
      .then(changedPlant => onChangePrice(changedPlant));
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: <input value = { changedPrice } onChange = { handleChangePrice } /></p>
      { isInStockBtn }
      <button id= 'delete' onClick = {handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
