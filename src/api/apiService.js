const API_BASE_URL = "https://localhost:7254/api";

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

export const addRecipe = async (recipeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Recipe`, {
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

export const addUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/User`, {
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

export const generateRecipe = async (recipeData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });
  
      if (!response.ok) throw new Error("Failed to generate recipe");
  
      return await response.json();
    } catch (error) {
      console.error("Error generating recipe:", error);
      return "Error generating recipe. Please try again.";
    }
  };
  
