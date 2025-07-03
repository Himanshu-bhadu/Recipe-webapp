import React, { useState, useEffect } from "react";
import Popdata from "./Popdata";

function Popular() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getPopularRecipes = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const data = await res.json();

        setRecipes(data.meals?.slice(0, 6) || []);
      } catch (err) {
        console.error("Error fetching popular recipes:", err);
      }
    };

    getPopularRecipes();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Popular Recipes</h1>
      <Popdata recipeInfo={recipes} />
    </div>
  );
}

export default Popular;
