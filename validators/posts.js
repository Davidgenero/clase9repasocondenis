const {check, validationResult} = require("express-validator")

const validatorCreatePost = [
    check("title")
        .exists()
        .notEmpty() 
        .isLength({min: 3, max: 124 }),
    check("body")   
        .exists()
        .notEmpty(),
    (req, res, next) => {
        const errors =validationResult(req)
        if(!errors.isEmpty())res.status(400).send({ errors: err.array() });
        else next();
        
        // try {
        //    validationResult(req).throw()
        //    return next() 
        // } catch (error) {
        //     res.status(400).send({errors: error.array() })
        // }
    }        
]
module.exports = {validatorCreatePost}