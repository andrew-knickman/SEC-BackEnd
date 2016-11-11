/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    _layoutFile : "backend_layout",
    'add': function (req, res) {
        res.view();
    },
    'create': function (req, res) {
        user.create( req.params.all(), function userCreated (err, user) {
            if (err) {
                req.session.flash = {
                    err: err
                };
                return res.redirect('/user/add');
            }
            res.redirect('/user/view/'+user.id);
        });
    },
    'view': function (req, res, next) {
        user.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user
            });
        });
    },
    'index': function (req, res, next) {
        user.find(function foundUsers (err, users) {
            if (err) return next(err);
            res.view({
                users: users
            });
        });
    },
    'edit': function (req, res, next) {
        user.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);
            if (!user) return next('User doesn\'t exist.');
            res.view({
                user: user
            });
        });
    },
    'update': function (req, res) {
        user.update(req.param('id'), req.params.all(), function userUpdated (err) {
            if (err) {
                req.session.flash = {
                    err: err
                };
                return res.redirect('/user/edit/' + req.param('id'));
            }
            res.redirect('/user/view/' + req.param('id'))
        });
    },
    'delete': function (req, res, next) {
        user.destroy(req.param('id')).exec(function (err){
            if (err) {
                return next(err);
            }
            res.redirect('/user');
        });

    }
    
};

