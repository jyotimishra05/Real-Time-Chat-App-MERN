const { getAllMsg, addMsg } = require("../controllers/messagesController");



const router = require("express").Router();

router.post("/getmsg/",getAllMsg);
router.post("/addmsg/",addMsg);


module.exports =router;