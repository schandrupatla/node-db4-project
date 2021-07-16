
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('steps').del()
    .then(function () {
      // Inserts seed entries
      return knex('steps').insert([
        {step_number: '1',step_instructions:"add ingredients to chicken and marinate it for 30 mins",recipe_id:1},
        {step_number: '2',step_instructions:"bake it in oven for 45 min at 400F",recipe_id:1},
        {step_number: '1',step_instructions:"Beat 2 eggs with added ingredients",recipe_id:2},
        {step_number: '2',step_instructions:"cook it in pan with some oil",recipe_id:2},
        {step_number: '1',step_instructions:"mix mango pulp with butter,cream and suger",recipe_id:3},
        {step_number: '2',step_instructions:"pour it in crust and freeze it for 45 mins",recipe_id:3},
      ]);
    });
};
