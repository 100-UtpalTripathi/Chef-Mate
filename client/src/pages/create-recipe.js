import React, { useState } from "react"; // Import React and its useState hook.
import axios from "axios"; // Import the Axios library for making HTTP requests.
import { useGetUserID } from "../hooks/useGetUserID"; // Custom hook to get the user's ID.
import { useNavigate } from "react-router-dom"; // Navigation hook for routing.
import { useCookies } from "react-cookie"; // Custom hook for managing cookies.

export const CreateRecipe = () => {
  const userID = useGetUserID(); // Get the user's ID using a custom hook.
  const [cookies, _] = useCookies(["access_token"]); // Manage cookies for authentication.
  const [recipe, setRecipe] = useState({
    // Initialize recipe state with form fields.
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID, // Set the user owner ID to the current user.
  });

  const navigate = useNavigate(); // Initialize navigation for routing.

  const handleChange = (event) => {
    // Event handler for input changes in the form.
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value }); // Update the corresponding field in the recipe state.
  };

  const handleIngredientChange = (event, index) => {
    // Event handler for ingredient input changes.
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients }); // Update the ingredients array in the recipe state.
  };

  const handleAddIngredient = () => {
    // Event handler to add a new ingredient field.
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients }); // Add a new empty ingredient field to the recipe state.
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.
    try {
      // Send a POST request to create a new recipe on the server.
      await axios.post("http://localhost:3001/recipes",
        { ...recipe }, // Send the recipe data.
        {
          headers: { authorization: cookies.access_token }, // Include the authorization token from cookies.
        }
      );

      alert("Recipe Created"); // Display a success message.
      navigate("/"); // Redirect to the home page after creating the recipe.
    } catch (error) {
      console.error(error); // Log any errors to the console.
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for recipe details */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        /><br />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
        ></textarea><br />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}<br />
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button><br />
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea><br />
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        /><br />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        /><br />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
