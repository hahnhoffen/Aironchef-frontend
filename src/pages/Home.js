import React, { useState } from "react";
import "../styles/Home.css";
import backgroundVideo from "../assets/backround.mp4";
import { generateRecipe } from "../api/apiService";

function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState(null); 

  const handleGenerateRecipe = async () => {
    setError(null);
    setRecipe(""); 
    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
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
        <textarea
          className="ingredients-input"
          placeholder="Enter your ingredients, separated by commas..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        ></textarea>
        <button className="generate-button" onClick={handleGenerateRecipe}>
          Generate Recipe
        </button>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {recipe && (
          <div className="recipe-output">
            <h2>Generated Recipe</h2>
            <p>{recipe}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
