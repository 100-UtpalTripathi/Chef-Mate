import mongoose from "mongoose"; // Import Mongoose, a popular Node.js library for working with MongoDB.

// Define a Mongoose schema for the User model.
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Define a field for the username. It must be a string, required, and unique.
  password: { type: String, required: true }, // Define a field for the password. It must be a string and required.
  savedRecipes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "recipes" },
  ], // Define a field for an array of saved recipes. It stores references to Recipe documents using their ObjectIDs.

  // Note: In Mongoose, schemas define the structure of documents in a MongoDB collection. Fields and their data types are specified here.
});

// Create a Mongoose model named "UserModel" based on the "UserSchema" schema.
export const UserModel = mongoose.model("users", UserSchema);

