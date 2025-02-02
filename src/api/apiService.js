const API_BASE_URL = "https://localhost:7254/api"; // Change if backend is hosted elsewhere

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Fetch all recipes
export const fetchRecipes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

// Fetch a recipe by ID
export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch recipe with ID: ${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
};

// Add a new recipe
export const addRecipe = async (recipeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) throw new Error("Failed to add recipe");
    return await response.json();
  } catch (error) {
    console.error("Error adding recipe:", error);
    return null;
  }
};

// Add a new user
export const addUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to add user");
    return await response.json();
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

// 🔥 Generate a recipe from OpenAI via backend
export const generateRecipe = async (ingredients) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recipes/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredients.split(",") }), // Ensure array format
    });

    if (!response.ok) throw new Error("Failed to generate recipe");

    const data = await response.json();
    return data.recipe; // Ensure this matches your backend response structure
  } catch (error) {
    console.error("Error generating recipe:", error);
    return "Error generating recipe. Please try again.";
  }
};
