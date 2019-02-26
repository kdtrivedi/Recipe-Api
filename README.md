# Recipe-Api

simple server that provides an API for someone to Create, Read, Update, and Delete recipes. These recipes will be stored in a database named recipes.

The recipe object

      { 
        _id: "A uuid",
        title: "Recipe title",
        ingredients: [
          {
            name: "Ingredient name",
            amount: "portion amount"
          }
        ],
        steps: [
          "First step",
          "Second step",
          "Third step"
        ]
      }
      
For example, a fried egg recipe:

    { 
      _id: "bd8fa389-3a7a-4478-8845-e36a02de1b7b",
      title: "Fried Eggs",
      ingredients: [
        {
          name: "Egg",
          amount: "2 eggs"
        },
        {
          name: "Olive Oil",
          amount: "2 tbsp"
        },
      ],
      steps: [
        "First, heat a non-stick pan on medium-high until hot",
        "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
        "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
        "Gently pour the egg from the bowl onto the oil",    
        "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
        "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
        "Remove from oil and plate",
        "Repeat for second egg"
      ]
    }
    
Packages:
-
express package as your server.
node-uuid package in order to generate unique id's to use as your identifiers. 
mongodb 

Routes:
-

    GET	/recipes	Responds with an array of all recipes in the format of {_id: RECIPE_ID, title: RECIPE_TITLE}
    GET	/recipes/:id	Responds with the full content of the specified recipe
    POST	/recipes	Creates a recipe with the supplied data in the request body, and returns the new recipe
    PUT	/recipes/:id	Updates the specified recipe with by replacing the recipe with the new recipe content, and returns the updated recipe
    PATCH	/recipes/:id	Updates the specified recipe with only the supplied changes, and returns the updated recipe
    DELETE	/recipes/:id	Deletes the recipe and returns nothing.
    
    
Any issues should result in a properly failed status code and a description of the error in JSON.
