import express from "express"; // Import the Express.js framework.
import mongoose from "mongoose"; // Import Mongoose for MongoDB interactions.
import { RecipesModel } from "../models/Recipes.js"; // Import the RecipesModel.
import { UserModel } from "../models/Users.js"; // Import the UserModel.
import { verifyToken } from "./user.js"; // Import the verifyToken function from the user.js file.

const router = express.Router(); // Create an Express Router.

// GET all recipes
router.get("/", async (req, res) => {
  try {
    // Fetch all recipes from the database using the RecipesModel.
    const result = await RecipesModel.find({});
    res.status(200).json(result); // Respond with the fetched recipes as JSON.
  } catch (err) {
    res.status(500).json(err); // Handle errors and respond with a 500 status code and the error as JSON.
  }
});

// POST a new recipe (with token verification)
router.post("/", verifyToken, async (req, res) => {
  // Create a new recipe instance using the data provided in the request body.
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(), // Generate a new ObjectID for the recipe.
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });

  try {
    const result = await recipe.save(); // Save the new recipe to the database.
    // Respond with the created recipe details as JSON.
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
    res.status(500).json(err); // Handle errors and respond with a 500 status code and the error as JSON.
  }
});

// GET a recipe by its ID
router.get("/:recipeId", async (req, res) => {
  try {
    // Fetch a recipe by its unique ID from the database.
    const result = await RecipesModel.findById(req.params.recipeId);
    res.status(200).json(result); // Respond with the fetched recipe as JSON.
  } catch (err) {
    res.status(500).json(err); // Handle errors and respond with a 500 status code and the error as JSON.
  }
});

// PUT (update) a recipe as saved by a user
router.put("/", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID); // Find the recipe by its ID.
  const user = await UserModel.findById(req.body.userID); // Find the user by their ID.

  try {
    user.savedRecipes.push(recipe); // Add the recipe to the user's list of saved recipes.
    await user.save(); // Save the updated user document.
    res.status(201).json({ savedRecipes: user.savedRecipes }); // Respond with the updated list of saved recipes as JSON.
  } catch (err) {
    res.status(500).json(err); // Handle errors and respond with a 500 status code and the error as JSON.
  }
});

// GET the IDs of saved recipes for a specific user
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    // Find the user by their ID and respond with the list of saved recipe IDs as JSON.
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.status(500).json(err); // Handle errors and respond with a 500 status code and the error as JSON.
  }
});

// GET the full details of saved recipes for a specific user, ":userId" is a dynamic parameter that can be any value, and it is accessible as req.params.userId
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    // Find the user by their ID.
    const user = await UserModel.findById(req.params.userId);
    // Find and fetch the full details of saved recipes based on their IDs.
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.status(201).json({ savedRecipes }); // Respond with the list of saved recipes as JSON.
  } catch (err) {
    res.status(500).json(err); // Handle errors and respond with a 500 status code and the error as JSON.
  }
});

// Export the router to make it available for use in other parts of the application.
export { router as recipesRouter };
