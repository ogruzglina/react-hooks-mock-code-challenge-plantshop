import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant, onChangePrice }) {
  const plant = plants.map( plant => 
    <PlantCard key = {plant.id} {...plant} onDeletePlant = {onDeletePlant} onChangePrice = {onChangePrice}/>
  );

  return (
    <ul className="cards">{ plant }</ul>
  );
}

export default PlantList;
