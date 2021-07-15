
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {recipe_name: 'spicy chicken'},
        {recipe_name: 'egg puffs'},
        {recipe_name: 'mango pie'},
      ]);
    });
};
