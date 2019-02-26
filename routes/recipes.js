const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.get("/", async (req, res) => {
  try {
    const recipeList = await recipeData.getAllRecipes();
    res.json(recipeList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await recipeData.getRecipeById(req.params.id);
    res.json(recipe);
  } catch (e) {
    res.status(404).json({ error: "recipe not found" });
  }
});

router.post("/", async (req, res) => {
  const recipeData1 = req.body;
  

  try {
    const { title, ingredients, steps } = recipeData1;

    const newrecipe = await recipeData.addRecipe(
      recipeData1.title,
      recipeData1.ingredients,
      recipeData1.steps
    );

    res.json(newrecipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  

  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }

  try {
    const updatedRecipe = await recipeData.updateRecipe(
      req.params.id,
      updatedData
    );
    res.json(updatedRecipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/:id", async (req, res) => {
  const updatedData = req.body;
 

  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }

  try {
    const updatedRecipe = await recipeData.updateRecipe(
      req.params.id,
      updatedData
    );
    res.json(updatedRecipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }
  try {
    await recipeData.removeRecipe(req.params.id);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
