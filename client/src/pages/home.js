import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID"; // Custom hook to get the user's ID.
import axios from "axios"; // Import the Axios library for making HTTP requests.

export const Home = () => {
  const [recipes, setRecipes] = useState([]); // State to store the fetched recipes.
  const [savedRecipes, setSavedRecipes] = useState([]); // State to store saved recipes.

  const userID = useGetUserID(); // Get the user's ID using a custom hook.

  // Fetch recipes and saved recipes when the component mounts.
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data); // Update the recipes state with fetched data.
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes); // Update savedRecipes state with fetched data.
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]); // The empty dependency array ensures this effect runs once when the component mounts.

  // Function to save a recipe to the user's saved recipes.
  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes); // Update savedRecipes after saving.
    } catch (err) {
      console.log(err);
    }
  };

  // Function to check if a recipe is saved by the user.
  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)} // Call saveRecipe when the button is clicked.
                disabled={isRecipeSaved(recipe._id)} // Disable the button if the recipe is already saved.
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"} {/* Display "Saved" if already saved. */}
              </button>
            </div><br />
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
