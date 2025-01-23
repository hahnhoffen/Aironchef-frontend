import React, { useState } from 'react';
import '../styles/Home.css';
import backgroundVideo from '../assets/backround.mp4';

function Home() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const generateRecipe = () => {
    setRecipe(`Here is a recipe based on your ingredients: ${ingredients}`);
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
  <div className="input-section">
    <textarea
      className="ingredients-input"
      placeholder="Enter your ingredients..."
      value={ingredients}
      onChange={(e) => setIngredients(e.target.value)}
    ></textarea>
    <button className="generate-button" onClick={generateRecipe}>
      Generate Recipe
    </button>
  </div>
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
