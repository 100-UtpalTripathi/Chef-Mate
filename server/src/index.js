// Enable ES6 module syntax in Node.js by specifying "type" as "module" in package.json.

// Import necessary modules and libraries.
import express from "express"; // Import Express.js, a web application framework for Node.js.
import cors from "cors"; // Import the CORS (Cross-Origin Resource Sharing) middleware.
import mongoose from "mongoose"; // Import Mongoose, a library for MongoDB interactions.
import { userRouter } from "./routes/user.js"; // Import the user router.
import { recipesRouter } from "./routes/recipes.js"; // Import the recipes router.

// Create an instance of the Express application.
const app = express();

// Middleware setup:
// Parse incoming JSON requests.
app.use(express.json());

// Enable CORS to handle cross-origin requests.
app.use(cors());

// Define routes for user-related and recipe-related endpoints using imported routers.
app.use("/auth", userRouter); // Routes starting with "/auth" are handled by the userRouter.
app.use("/recipes", recipesRouter); // Routes starting with "/recipes" are handled by the recipesRouter.

// Connect to the MongoDB database using Mongoose.
mongoose.connect(
  "mongodb+srv://utpaltripathi:MERNpassword123@recipes.racit1t.mongodb.net/recipes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, // Set "useNewUrlParser" to true for compatibility.
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine.
  }
);

// Start the Express server on port 3001.
app.listen(3001, () => {
  console.log("Server started at 3001!");
});
