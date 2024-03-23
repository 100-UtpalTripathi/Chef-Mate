import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID"; // Custom hook to get the user's ID.
import axios from "axios"; // Import the Axios library for making HTTP requests.

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]); // State to store the user's saved recipes.
  const userID = useGetUserID(); // Get the user's ID using a custom hook.

  // Fetch the user's saved recipes when the component mounts.
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes); // Update savedRecipes state with fetched data.
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]); // The empty dependency array ensures this effect runs once when the component mounts.

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <div className="instructions">
              <p>{recipe.instructions}</p>
              <h2>Ingredients:</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <p><h2>Cooking Time: {recipe.cookingTime} minutes</h2></p>
          </li>
        ))}
      </ul>
    </div>
  );
};
