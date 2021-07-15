const express = require('express')
//const { checkSchemeId, validateScheme, validateStep } = require('./scheme-middleware')
const dbAccess = require('./model')

const router = express.Router()
router.get('/:recipe_id', (req, res, next)=>{
    dbAccess.getRecipeById(req.params.recipe_id)
    .then(recipe=>{
        res.json(recipe)
    })
    .catch(next);
})
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      sageAdvice: 'Finding the real error is 90% of the bug fix',
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router