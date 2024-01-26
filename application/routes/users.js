var express = require('express');
var router = express.Router();
var db = require('../conf/database');
var bcrypt = require('bcrypt');
var {isLoggedIn,isMyProfile}=require("../middleware/auth");
const {isUsernameUnique, usernameCheck, emailCheck, tosCheck, passwordCheck, ageCheck, isEmailUnique} = require("../middleware/validation");
const {getPostsForUserBy}=require("../middleware/posts")

/*GET localhost:3000/users/register*/


router.post('/register',
    usernameCheck,
    passwordCheck,
    emailCheck,
    tosCheck,
    ageCheck,
    isUsernameUnique,
    isEmailUnique,
    async function (req, res, next) {
    var {username, email, password,profileImg} = req.body;

    try {
        var hashPassword = await bcrypt.hash(password, 3);
        //insert
        var [resultObject, fields] = await db.execute(`insert into users (username,email,password,profileImg)
        value (?,?,?,?);`, [username, email, hashPassword, profileImg]);

        //respond
        if (resultObject && resultObject.affectedRows == 1) {
            req.flash("success",`You have successfully registered!`);
            return res.redirect("/login");
        } else {
            //error message: middleware/validation.js
            return res.redirect('/register');
        }
        res.end();
    } catch (error) {
        next(error);
    }


    res.end();
});

router.post('/login', async function (req, res, next) {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.redirect("/login");
    } else {
        var [rows, fields] = await db.execute(
            `select id,username,password,email,profileImg from users where username=?;`,
            [username]
        );
        //first user
        var user = rows[0];
        if (!user) {
            req.flash("error",`Log In Failed: Invalid username/password`);
            req.session.save(function(err){
                return res.redirect("/login");
            })

        } else {
            //result if passwords match or not
            var passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) {
                req.session.user = {
                    userId: user.id,
                    email: user.email,
                    username: user.username,
                    profileImg:user.profileImg,

                };
                req.flash("success",`You are now logged in`);
                req.session.save(function(err){
                    return res.redirect("/");
                })
            } else {
                req.flash("error",`Log In Failed: Invalid username/password`);
                return res.redirect("/login");
            }

        }
    }
});

router.use(function(req,res,next){
    if(req.session.user){
        next();
    }else{ //if not login
        return res.redirect('/login');
    }
})
router.get('/profile/:id(\\d+)',isLoggedIn,isMyProfile, getPostsForUserBy,function (req, res) {
    res.render('profile');
})


router.post('/logout', function (req, res, next) {
    req.session.destroy(function(err){
        if(err){
            next(err);
        }
        return res.redirect('/');
    })
});

module.exports = router;
