const {register,login,avatar, getAllUser} = require("../controllers/userControllers");


const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setavatar/:id" , avatar);
router.get("/allusers/:id" , getAllUser);

module.exports =router;
