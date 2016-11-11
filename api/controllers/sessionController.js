/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcryptjs');
module.exports = {
    'login': function (req, res) {
        res.view();
    },
    'create': function (req, res, next) {
        if (!req.param('username') || !req.param('password')) {
            req.session.flash = {
                err: ['You must enter a username and password']
            };
            res.redirect('/session/login');
            return;
        }
        user.findOne({username: req.param('username')}).exec(function(err, user) {
            if (err) return next(err);

            if (!user) {
                req.session.flash = {
                    err: ['Username ' + req.param('username') + ' Not Found']
                };
                return res.redirect('/session/login');
            }


            bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
                if (err) return next(err);

                if (!valid) {
                    req.session.flash = {
                        err: ['Invalid username and password combination']
                    };
                    return res.redirect('/session/login');
                }

                req.session.authenticated = true;
                req.session.user = user;
                res.redirect('/');

            });
        });
    },
    'logout': function(req, res) {
        req.session.destroy(function(err) {
            return res.redirect('/');
        });
    }
};

