
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps_ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps_ingredients').insert([
        {ingredient_quantity: '2lbs',step_id:1,ingredient_id:1},//chicken
        {ingredient_quantity: '2',step_id:3,ingredient_id:2},//eggs
        {ingredient_quantity: '1 stick',step_id:5,ingredient_id:3},//butter
        {ingredient_quantity: '8 oz',step_id:5,ingredient_id:4},//cream
      ]);
    });
};

