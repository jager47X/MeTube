var validator = require('validator');
var db=require('../conf/database');
module.exports = {
    usernameCheck: function (req, res, next) {
        var {username} = req.body;
        username = username.trim();

        if (!validator.isLength(username, {min: 3})) {
            req.flash("error", `Username must be 3 or more characters`);
        }
        if (!/[a-zA-z]/.test(username.charAt(0))) {
            req.flash("error", `Username must begin with a character`);
        }
        if (req.session.flash.error) {
            res.redirect('/register');
        } else {
            next();
        }
    },
    passwordCheck: function (req, res, next) {
        var {password} = req.body;
        if (!validator.isLength(password, {min: 8})) {
            req.flash("error", "Password must be at least 8 characters long");
        }
        if (!/[A-Z]/.test(password)) {
            req.flash("error", "Password must contain at least one uppercase letter");
        }
        if (!/[0-9]/.test(password)) {
            req.flash("error", "Password must contain at least one number");
        }
        if (!/[/\\\-*+!@#$^&~\[\]]/.test(password)) {
            req.flash("error", "Password must contain at least one of the special characters");
        }
        if (req.session.flash.error) {
            res.redirect('/register');
        } else {
            next();
        }
        },
    emailCheck: function (req, res, next) {
        var {email} = req.body;
        if (!validator.isEmail(email)) {
            req.flash("error", "Invalid email");
        }
        if (req.session.flash.error) {
            res.redirect('/register');
        } else {
            next();
        }
        },
    tosCheck: function (req, res, next) {
        var {tos} = req.body;
        if (!tos) {
            req.flash("error", "You must agree to the terms of service");
        }
        if (req.session.flash.error) {
            res.redirect('/register');
        } else {
            next();
        }
        },
    ageCheck: function (req, res, next) {
        var {age} = req.body;
        if (!age) {
            req.flash("error", "You must be at least 13 years old");
        }
        if (req.session.flash.error) {
            res.redirect('/register');
        } else {
            next();
        }
        },
    isUsernameUnique: async function (req, res, next) {
        var {username} = req.body;
        try {
            var [rows, fields] = await db.execute(
                `select id from users where username=?`,
                [username]
            );
            if (rows && rows.length > 0) {
                req.flash("error", `${username} is already taken`);
                return req.session.save(function (err) {
                    return res.redirect("/register");
                });
            }
            else{
                next();
            }
        } catch (error) {
            next(error);
        }
    },
    isEmailUnique: async function (req, res, next) {
    var {email}= req.body;
    try{
        var [rows,fields]=await db.execute(
            `select id from users where email=?`,[email]
        );
        if (rows && rows.length > 0) {
            req.flash("error", `${username} is already taken`);
            return req.session.save(function (err) {
                return res.redirect("/register");
            });
        }
        else{
            next();
        }
    } catch (error) {
        next(error);
    }
    },

}