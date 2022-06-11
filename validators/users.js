const {check, validationResult} = require("express-validator");

//creamos el middleware
const validatorCreateUser = [
  check("name")
    .exists().withMessage("Name field required")
    .trim()//sanitizer
    .notEmpty().withMessage("Must contain values")
    .isAlpha('es-ES',{ignore : ' '}).withMessage("Only letters")
    .isLength({min: 2, max: 90 }).withMessage("Character count min 2, max 90"),
  check("email")
    .exists().withMessage("Email is required")
    .trim()
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(),//Sanitizer
   check("password")
    .exists()
    .trim()
    .isLength({min :8, max:20 }).withMessage("Character count min 8, max 20") 
    .notEmpty().withMessage("Must contain values"),
 
  

  (req, res, next) => {
      try {
          validationResult(req).throw()
          return next() //si pasa las validaciones, sigue hacia el controles (o hacia el siguiente middleware)
      } catch (error) {
          res.status(400).json({errors: error.array()})
      }
  }
]

module.exports = {validatorCreateUser}