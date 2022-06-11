const router = require("express").Router();
const { listAll, listOne, register, login, removeOne, editOne } = require("./usersController")
const {validatorCreateUser} = require("../validators/users")
const fileUpload = require("../utils/handleStorage")


//get all users
router.get("/", listAll)

//get user by id
router.get("/:id", listOne);

//Register
router.post("/register", fileUpload.single("file"), validatorCreateUser, register);
//Login
router.post("/login", login)

//patch user by id
router.patch("/:id", fileUpload.single("file"), editOne)

//delete user by id
router.delete("/:id", removeOne);



module.exports = router