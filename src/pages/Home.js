import React, { useState } from "react";
import "../styles/Home.css";
import backgroundVideo from "../assets/backround.mp4";
import { generateRecipe } from "../api/apiService";

function Home() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [mealType, setMealType] = useState(1);
  const [maxCookingTime, setMaxCookingTime] = useState(30);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleMealTypeChange = (e) => {
    setMealType(Number(e.target.value));
  };

  const handleGenerateRecipe = async () => {
    setError(null);
    setRecipe(null);

    if (ingredients.length === 0) {
      setError("Please add at least one ingredient.");
      return;
    }

    try {
      const recipeData = {
        ingredients,
        maxCookingTimeMinutes: maxCookingTime,
        mealType
      };
      const generatedRecipe = await generateRecipe(recipeData);
      if (generatedRecipe) {
        setRecipe(generatedRecipe);
      } else {
        setError("Failed to generate recipe. Please try again.");
      }
    } catch (error) {
      setError("Failed to generate recipe. Please try again.");
    }
  };

  return (
    <div className="home">
      <video autoPlay muted loop className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content">
        <h1>Welcome to AironChef</h1>
        <p>Your AI-powered recipe assistant.</p>

        {/* Ingredients Section */}
        <div className="input-group">
          <label>Ingredients:</label>
          <div className="ingredient-input">
            <input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder="Enter an ingredient"
            />
            <button type="button" onClick={handleAddIngredient}>Add</button>
          </div>
          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient} <span onClick={() => handleRemoveIngredient(index)}>❌</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Meal Type Selection */}
        <div className="input-group">
          <label>Meal Type:</label>
          <div className="meal-options">
            {[
              { label: "Breakfast", value: 1 },
              { label: "Lunch", value: 2 },
              { label: "Dinner", value: 3 },
              { label: "Supper", value: 4 },
            ].map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="mealType"
                  value={option.value}
                  checked={mealType === option.value}
                  onChange={handleMealTypeChange}
                />
                {option.label} ({option.value})
              </label>
            ))}
          </div>
        </div>

        {/* Max Cooking Time Input */}
        <div className="input-group">
          <label>Max Cooking Time (minutes):</label>
          <input
            type="number"
            value={maxCookingTime}
            onChange={(e) => setMaxCookingTime(Number(e.target.value))}
            min="1"
          />
        </div>

        {/* Generate Button */}
        <button className="generate-button" onClick={handleGenerateRecipe}>
          Generate Recipe
        </button>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {/* Display Generated Recipe */}
        {recipe && (
          <div className="recipe-output">
            <h2>{recipe.name}</h2>
            <p><strong>Description:</strong> {recipe.description || "No description available."}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients ? recipe.ingredients.join(", ") : "N/A"}</p>
            <p><strong>Instructions:</strong></p>
            <ul>
              {recipe.instructions && recipe.instructions.length > 0 ? (
                recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))
              ) : (
                <p>No instructions provided.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
