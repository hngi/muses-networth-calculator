const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const APP_SECRET = require('../utils.js').APP_SECRET;

exports.signup = function (req, res) 
{
    let user = new User();
    if (!req.body || !req.body.name || !req.body.email || !req.body.password)
        return res.json(
        {
            errors: "Bad request! Supply POST data: name, email and password",
            code: 401
        })
    User.findOne({email: req.body.email}).then(oldUser => 
    {
        if (oldUser)
            return res.json({errors: "Email already exists", code: 427});
        user.name = req.body.name;
        user.email = req.body.email;

        bcrypt.hash(req.body.password, 10).then(pass =>
        {
            user.passwordHash = pass;
            const token = jwt.sign({email: user.email, id: user._id}, APP_SECRET)
            user.save(err =>
            {
                if (err)
                    return res.json(err);
                res.json(
                {
                    message: 'New user created',
                    data: 
                    {
                        name: user.name,
                        email: user.email,
                        token
                    }
                });
            });
        });
    });
};
// Handle view user info
exports.login = function (req, res) 
{
    if (!req.body || !req.body.email || !req.body.password)
        return res.json(
        {
            errors: "Bad request! Supply POST data: name, email and password",
            code: 401
        })
    User.findOne({email: req.body.email}).then(user => 
    {
        if (!user)
            return res.json({errors: "Email does not exist", code: 496});

        bcrypt.compare(req.body.password, user.passwordHash).then(valid =>
        {
            if (!valid)
                return res.json({errors: "Incorrect password", code: 419});

            const token = jwt.sign({email: user.email, id: user._id}, APP_SECRET);
            res.json(
            {
                message: 'Successful login',
                data:
                {
                    name: user.name,
                    email: user.email,
                    token
                }
            });
        });
    });
};



//
// The rest of CRUD for user model. Not used at the moment in this API
//
exports.update = function (req, res) {
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name;
        user.email = req.body.email;
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: user
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};