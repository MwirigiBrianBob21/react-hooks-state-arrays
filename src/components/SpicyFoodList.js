import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  // foods is declared as the initial state of spicyFoods which is an array of objects
  const [foods, setFoods] = useState(spicyFoods);

  // Arrays in State, remember that our initial state is spicyFoods

  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    const newFoodArray = { ...foods, newFood };
    // console.log(newFood);
    // IMPORTANT to set the newFoodArray in the update state
    setFoods(newFoodArray);
  }
  // removing elements from arrays in state
  // using .map to come up with a new array foodList
  // here, when a user clicks a food, it dissapears from the list
  const foodList = foodsToDisplay.map((food) => (
    // remember to define the function because we are passing the id of the food we want to delete
    // 1. creating an handler on li
    // key is used to select the unique identifier in the newly created array list
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ));

  // creating a new array with all the original elements- doesn't include a specific element
  // 2. Updating our array in state so it doesn't include the food- using .filter method
  function handleLiClick(id) {
    // the callback in .filter looks for all foods except the number we want to remove
    // [1,2,3].filter((number) => number !==3)
    // 1. REMOVING AN ELEMENT IN AN ARRAY
    const newFoodList = foods.filter((food) => food.id !== id);
    setFoods(newFoodList);

    const newFoodArrayInList = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        };
      } else {
        return food;
      }
    });
    setFoods(newFoodArrayInList);
  }

  const [filterBy, setFilterBy] = useState("All");
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  })

  

  function handleFilterChange(event) {
    setFilterBy(event.target.value);
  }

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>

      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
