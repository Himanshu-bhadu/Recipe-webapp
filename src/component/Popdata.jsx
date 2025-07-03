import React, { useState } from 'react';

function Popdata({ recipeInfo }) {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (!ingredient || ingredient.trim() === '') break;
      ingredients.push(`${measure?.trim()} ${ingredient.trim()}`.trim());
    }
    return ingredients;
  };

  if (!recipeInfo || recipeInfo.length === 0) return null;

  return (
    <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipeInfo.map((meal) => (
        <div key={meal.idMeal} className="bg-white border rounded shadow-lg p-4 hover:shadow-xl transition">
          <h2 className="text-xl font-bold mb-2">{meal.strMeal}</h2>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover rounded mb-2"
          />

          <button
            onClick={() => toggleCard(meal.idMeal)}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded mb-2 cursor-pointer hover:scale-105 transition-transform duration-200 
            flex justify-center align-middle ml-30"
          >
            {expandedCards[meal.idMeal] ? "Hide Recipe" : "Show Recipe"}
          </button>

          {expandedCards[meal.idMeal] && (
            <>
              <h3 className="font-semibold text-lg mb-1">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-2 max-h-32 overflow-y-auto">
                {getIngredients(meal).map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              <h3 className="font-semibold text-lg mb-1">Instructions</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 max-h-40 overflow-y-auto">
                {meal.strInstructions
                  ?.split(/(?<=\.)\s+/)
                  .filter((line) => line.trim() !== "")
                  .map((step, index) => (
                    <li key={index}>{step.trim()}</li>
                  ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Popdata;
