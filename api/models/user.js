/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      unique: true
    },
    encryptedPassword: {
      type: 'string'
    },
    toJson: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirm_password;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  },
  'beforeCreate': function (values, next) {
    if(!values.password || values.password != values.confirm_password) {
      return next({err: ["Passwords are not equal."]});
    }
    require('bcryptjs').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      next();
    });
  }
};

