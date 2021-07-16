const db = require("../data/db-config");

const getRecipeById = async (recipe_id) => {
  const data = await db("recipes as r")
    .leftJoin("steps as s", "r.recipe_id", "=", "s.recipe_id")
    .where("r.recipe_id", recipe_id)
    .select("r.*", "s.*","i.ingredient_id" ,"i.ingredient_name", "si.ingredient_quantity")
    .leftJoin("steps_ingredients as si", "s.step_id", "=", "si.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "=", "i.ingredient_id")
    .orderBy("s.step_number");
  //return results;
  const results = {
    recipe_id: data[0].scheme_id,
    recipe_name: data[0].scheme_name,
    created_at: data[0].created_at,
    steps: data.reduce((acc, row) => {
      if (!row.ingredient_id) {
        //it's a new step without any ingredients
        return acc.concat({
          step_id: row.step_id,
          step_number: row.step_number,
          step_instructions: row.step_instructions,
        });
      }
      if (
        row.ingredient_id &&
        !acc.find((step) => step.step_id === row.step_id)
      ) {
        //it is a new step with an ingredient
        return acc.concat({
          step_id: row.ste_id,
          step_number: row.step_number,
          step_instructions: row.step_instructions,
          ingredients: [
            {
              ingredient_id: row.ingredient_id,
              ingredient_name: row.ingredient_name,
              ingredient_quantity: row.ingredient_quantity,
            },
          ],
        });
      }
      //it's a step we encountered before
      const currentStep = acc.find((step) => step.step_id === row.step_id);
      currentStep.ingredients.push({
        ingredient_id: row.ingredient_id,
        ingredient_name: row.ingredient_name,
        ingredient_quantity: row.ingredient_quantity,
      });
      return acc;
    }, []),
  };
  return results;
};
module.exports = {
  getRecipeById,
};

//query
//   select r.*,s.* , i.ingredient_name, si.ingredient_quantity
//   from  recipes as r
//   left join steps as s
//   on r.recipe_id = s.recipe_id
//    left join steps_ingredients as si
//   on s.step_id = si.step_id
//   left join ingredients as i
//   on si.ingredient_id = i.ingredient_id
//   order by s.step_number
