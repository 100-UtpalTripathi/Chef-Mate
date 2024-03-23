import React, { useState } from "react"; // Import React and its useState hook.
import axios from "axios"; // Import the Axios library for making HTTP requests.
import { useCookies } from "react-cookie"; // Custom hook for managing cookies.
import { useNavigate } from "react-router-dom"; // Navigation hook for routing.

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

// Login Component
const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]); // Use the cookies hook to manage cookies.

  const [username, setUsername] = useState(""); // State for the username input.
  const [password, setPassword] = useState(""); // State for the password input.

  const navigate = useNavigate(); // Initialize navigation for routing.

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    try {
      // Send a POST request to the server to log in.
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      // Set the access token in cookies and user ID in local storage.
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/"); // Redirect to the home page upon successful login.
    } catch (error) {
      console.error(error); // Log any errors to the console.
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Register Component
const Register = () => {
  const [username, setUsername] = useState(""); // State for the username input.
  const [password, setPassword] = useState(""); // State for the password input.

  const [_, setCookies] = useCookies(["access_token"]); // Use the cookies hook to manage cookies.
  const navigate = useNavigate(); // Initialize navigation for routing.

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.
    try {
      // Send a POST request to the server to register a new user.
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login."); // Display a success message.
    } catch (error) {
      console.error(error); // Log any errors to the console.
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
