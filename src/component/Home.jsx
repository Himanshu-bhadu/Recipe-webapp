import React, { useState } from 'react';
import MealCard from './Mealcard';

function Home() {
  const [dish, setDish] = useState("");
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchClick = async () => {
    if (!dish.trim()) return;

    setHasSearched(true);

    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`);
      const data = await res.json();
      setRecipeInfo(data.meals);
      console.log(data.meals);
    } catch (err) {
      console.error("Error fetching recipe:", err);
      setRecipeInfo(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl h-full mt-4 mb-10">
      <div className="h-80 flex justify-center items-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Which Recipe you want to search"
            className="w-full h-10 bg-amber-200 rounded-full px-4 pr-10"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
            handleSearchClick();
    }
  }}
          />
          <img
            src="https://www.svgrepo.com/show/532552/search-alt-2.svg"
            alt="Search Icon"
            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={handleSearchClick}
          />
        </div>
      </div>

      {hasSearched && recipeInfo === null && (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}

      {recipeInfo && <MealCard recipeInfo={recipeInfo} />}
    </div>
  );
}

export default Home;
