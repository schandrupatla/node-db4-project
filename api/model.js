const db = require('../data/db-config');

const getRecipeById =  async (recipe_id)  => {
    const results = await db("recipes as r")
  .leftJoin("steps as s","r.recipe_id" ,"=","s.recipe_id")
  .where( "r.recipe_id", recipe_id )
  .select("r.*","s.*","i.ingredient_name","si.ingredient_quantity")
  .leftJoin("steps_ingredients as si","s.step_id", "=" ,"si.step_id")
  .leftJoin("ingredients as i", "si.ingredient_id", "=", "i.ingredient_id")
    return results;
}
  module.exports = {
    getRecipeById
  };

  //query
// select r.*,s.* , i.ingredient_name, si.ingredient_quantity
// from  recipes as r
// left join steps as s
// on r.recipe_id = s.recipe_id
//  left join steps_ingredients as si
// on s.step_id = si.step_id
// left join ingredients as i 
// on si.ingredient_id = i.ingredient_id