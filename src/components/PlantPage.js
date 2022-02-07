import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [ plants, setPlants ] = useState([]);
  const [ search, setSearch ] = useState('');

  useEffect( () => {
    fetch('http://localhost:6001/plants')
      .then(r => r.json())
      .then(plantsData => setPlants(plantsData))
  }, []);

  function handleAddPlant (newPlant) {
    setPlants([
      ...plants,
      newPlant]);
  }

  function handleSearch (plant) {
    setSearch(plant)
  }

  const filteredPlants = plants.filter( plant => plant.name.includes(search));

  function handleDelete (deletedPlantId) {
    setPlants( plants.filter( plant => plant.id !== deletedPlantId));
  }

  function handleChangePrice (changedPlant) {
    const changedPricePlants = plants.map( plant => 
      plant.id === changedPlant.id ? changedPlant : plant
    ); 

    setPlants(changedPricePlants);
  }

  return (
    <main>
      <NewPlantForm onAddPlant = { handleAddPlant }/>
      <Search search = { search } onSearch = { handleSearch }/>
      <PlantList plants = { filteredPlants } onDeletePlant = { handleDelete } onChangePrice = {handleChangePrice}/>
    </main>
  );
}

export default PlantPage;
