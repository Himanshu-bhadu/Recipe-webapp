import React from 'react';
import { NavLink } from 'react-router-dom';

function MealCard({ recipeInfo }) {
  if (!recipeInfo || recipeInfo.length === 0) return null;

  const getIngredients = (meal) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (!ingredient || ingredient.trim() === "") break;

      ingredients.push(`${measure?.trim()} ${ingredient.trim()}`.trim());
    }

    return ingredients;
  };

  return (
    <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-pink-200 py-4">
      {recipeInfo.map((meal) => (
        <div
          key={meal.idMeal}
          className="bg-amber-500 border rounded shadow-lg p-4 hover:shadow-xl transition"
        >
          <h2 className="text-xl font-bold mb-2">{meal.strMeal}</h2>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover rounded mb-2"
          />
          
          <NavLink to={`${meal.idMeal}`}>
          <button className='bg-sky-400 flex justify-center rounded-xl p-3 ml-30 cursor-pointer hover:scale-110 transition-transform duration-200 '>Show Recipe</button>
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default MealCard;
