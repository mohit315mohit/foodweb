import React, { useState } from "react";

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign-In and Log-In
  const [username, setUsername] = useState("");
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, iserror] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);

  const signup = ({ username, name, email, password }) => {
    fetch("http://localhost:3030/User/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name, email, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Sign-In Successful!");
          toggleForm();
          alert("Sign-In Successful!");
        } else {
          console.error("Sign-In Failed!");
          alert("Sign-In Failed!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const login = () => {
    fetch("http://localhost:3030/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Log-In Successful!");
          alert("Log-In Successful!");
        } else {
          console.error("Log-In Failed!");
          alert("Log-In Failed!");
          iserror(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("Sign-In Data:", { username, name, email, password });
      signup({ username, name, email, password });
    } else {
      console.log("Log-In Data:", { username, password });
      login({ username, password });
    }
    // Clear inputs after submission
    setUsername("");
    setname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-gray-100 shadow-md relative">
      <button
        onClick={toggleForm}
        className="absolute top-4 right-4 py-1 px-3 text-blue-600 border-2 rounded-lg bg-white hover:bg-gray-200"
      >
        {isSignUp ? "Log In" : "Sign In"}
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignUp ? "Sign Up" : "Log In"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <div className="flex items-center">
            <label
              htmlFor="name"
              className="w-1/4 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your full name"
              required={isSignUp}
              className="w-3/4 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
        <div className="flex items-center">
          <label
            htmlFor="username"
            className="w-1/4 text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="w-3/4 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {isSignUp && (
          <div className="flex items-center">
            <label
              htmlFor="email"
              className="w-1/4 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-3/4 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="w-1/4 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-3/4 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && (
            <div className="text-red-700">Incorrect username and password</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSignUp ? "Sign In" : "Log In"}
        </button>
      </form>
    </div>
  );
}
