import React, { useState } from "react";
import "../styles/UsersAndRecipes.css";
import { fetchUsers, fetchRecipes, fetchRecipeById, addUser } from "../api/apiService";

function UsersAndRecipes() {
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  const handleFetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleFetchRecipes = async () => {
    try {
      setLoadingRecipes(true);
      setError(null);
      const data = await fetchRecipes();
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch recipes.");
    } finally {
      setLoadingRecipes(false);
    }
  };

  const handleFetchRecipeDetails = async (id) => {
    try {
      setError(null);
      const data = await fetchRecipeById(id);
      setSelectedRecipe(data);
    } catch (err) {
      setError("Failed to fetch recipe details.");
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const response = await addUser(newUser);
    if (response) {
      alert("User created successfully!");
      setShowModal(false);
      handleFetchUsers();
    } else {
      alert("Error creating user.");
    }
  };

  return (
    <div className="users-recipes-page">
      <h1>Users & Recipes</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="button-container">
        <button onClick={handleFetchUsers} disabled={loadingUsers}>
          {loadingUsers ? "Loading..." : "Show Users"}
        </button>
        <button onClick={handleFetchRecipes} disabled={loadingRecipes}>
          {loadingRecipes ? "Loading..." : "Show Recipes"}
        </button>
        <button className="create-user-btn" onClick={() => setShowModal(true)}>
          Create User
        </button>
      </div>

      <div className="content-container">
        <div className="section">
          <h2>Users</h2>
          <div className="scroll-box">
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : (
              <ul>
                {users.length > 0 ? (
                  users.map((user, index) => <li key={index}>{user.name}</li>)
                ) : (
                  <p>No users found.</p>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="section">
          <h2>Recipes</h2>
          <div className="scroll-box">
            {loadingRecipes ? (
              <p>Loading recipes...</p>
            ) : (
              <ul>
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <li key={recipe.id} onClick={() => handleFetchRecipeDetails(recipe.id)}>
                      {recipe.name}
                    </li>
                  ))
                ) : (
                  <p>No recipes found.</p>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      {selectedRecipe && (
        <div className="recipe-details">
          <h2>Recipe Details</h2>
          <p>{selectedRecipe.description || "No description available."}</p>
          <p>
            <strong>Ingredients:</strong> {selectedRecipe.ingredients}
          </p>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Create User</h2>
            <form onSubmit={handleCreateUser}>
              <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersAndRecipes;
