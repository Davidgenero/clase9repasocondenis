const {tokenVerify} = require("./handleJWT")

const isAuth = async (req,res, next) => {
  try {
      if(!req.headers.authorization){ 
      let error = new Error("No token")
      error.status = 401
      return next(error)
    }
    const token = req.headers.authorization.split(" ").pop()
    const validToken =await tokenVerify(token)
    if(validToken instanceof Error) {
        return next(error)
    }
    req.user = validToken
    next()
      
  } catch (error) {
    error.status = 401
    error.message = "Forbidden"
    return next(error)
  }
  

}

module.exports = isAuth