const mongoCollections = require("../config/mongoCollection");
const recipes = mongoCollections.recipes;
const uuid = require("node-uuid");

const exportedMethods = {
  async getAllRecipes() {
    const recipeCollection = await recipes();
    return await recipeCollection.find({}, { _id: 1, title: 1 }).toArray();
  },

  async getRecipeById(id) {
    const recipeCollection = await recipes();
    const recipe = await recipeCollection.findOne({ _id: id });

    if (!recipe) throw "Recipe not found";
    return recipe;
  },

  async addRecipe(title, ingredients, steps) {
      if (!title || typeof title != "string") throw "Invalid title!";

      if(!ingredients || !Array.isArray(ingredients)){
        throw "Invalid ingredients!";
    }
      if(!steps || !Array.isArray(steps)){
          throw "Invalid steps!";
      }

    const recipeCollection = await recipes();

    const newrecipe = {
      _id: uuid.v4(),
      title: title,
      ingredients: ingredients,

      steps: steps
    };

    const newInsertInformation = await recipeCollection.insertOne(newrecipe);

    const newId = newInsertInformation.insertedId;
    return await this.getRecipeById(newId);
  },

  async removeRecipe(id) {
    const recipeCollection = await recipes();
    const deletionInfo = await recipeCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete recipe with id of ${id}`;
    } else console.log("Recipe Deleted");
  },

  async updateRecipe(id, updatedRecipe) {
    const recipeCollection = await recipes();

    const updatedRecipeData = {};

    if (updatedRecipe.title) {
      updatedRecipeData.title = updatedRecipe.title;
    }

    if (updatedRecipe.ingredients) {
      updatedRecipeData.ingredients = updatedRecipe.ingredients;
    }

    if (updatedRecipe.steps) {
      updatedRecipeData.steps = updatedRecipe.steps;
    }

    let updateCommand = {
      $set: updatedRecipeData
    };
    const query = {
      _id: id
    };
    await recipeCollection.updateOne(query, updateCommand);

    return await this.getRecipeById(id);
  }
};

module.exports = exportedMethods;
