var express = require('express');
var router = express.Router();
const{isLoggedIn}=require("../middleware/auth");
const {getRecentPosts} = require("../middleware/posts");
/* GET home page. */
//localhost:3000

router.use(function (req, res, next) {
    req.userIsLoggedIn = true;
    next();
})

router.get('/', getRecentPosts,function (req, res, next) {
    res.render('index', {title: 'MeTube', name: "Yuto Mori"});
});


router.get("/login", function (req, res) {
    res.render('login', {title: "Login"});
})
router.get("/register", function (req, res) {
    res.render('registration', {title: "Register", js: ["validation.js"]});
})

router.get('/postvideo', isLoggedIn,function (req, res) {
    res.render('postvideo', {title: "Post a video"});
})


module.exports = router;
