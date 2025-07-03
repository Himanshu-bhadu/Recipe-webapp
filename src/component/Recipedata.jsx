import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Recipedata = () => {
  const { dishid } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getinfo = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishid}`);
        const jsondata = await res.json();
        setInfo(jsondata.meals?.[0] || null);
        console.log(jsondata.meals?.[0]);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };

    if (dishid) getinfo();
  }, [dishid]);
  if (!info) return null;

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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{info.strMeal}</h1>

      <img
        src={info.strMealThumb}
        alt={info.strMeal}
        className="w-full h-150 object-cover rounded-lg shadow mb-6"
      />

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {getIngredients(info).map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-800">
          {info.strInstructions
            ?.split(/(?<=\.)\s+/)
            .filter((line) => line.trim() !== "")
            .map((step, i) => (
              <li key={i}>{step.trim()}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Recipedata;
