
exports.up = async function(knex, promise) {
    //Table recipes
    await knex.schema
    .createTable('recipes', table => {
      table.increments('recipe_id')
      table.string('recipe_name', 250).notNullable().unique()
      table.string('created_at',{ precision: 6 }).defaultTo(knex.fn.now())
    })
    //table ingredients
    .createTable('ingredients', table => {
        table.increments('ingredient_id')
        table.string('ingredient_name', 250).notNullable().unique()
      })
      //table steps
    .createTable('steps', table => {
        table.increments('step_id')
        table.integer('step_number').notNullable()
        table.string('step_instructions', 250).notNullable()
        table.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onDelete('RESTRICT').onUpdate('RESTRICT')
      })
      //table steps_ingredients
    .createTable('steps_ingredients', table => {
        table.increments('step_ingredient_id')
        table.string('ingredient_quantity',250).notNullable()
        table.integer('step_id')
        .unsigned()
        .notNullable()
        .references('step_id')
        .inTable('steps')
        .onDelete('RESTRICT').onUpdate('RESTRICT')
        table.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onDelete('RESTRICT').onUpdate('RESTRICT')
      })
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('steps_ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes')
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