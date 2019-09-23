const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user.js');
const APP_SECRET = "muses is bae";


exports.signup = async function (req, res) 
{
    let user = new User();
    if (!req.body || !req.body.name || !req.body.email || !req.body.password)
        res.json({
            errors: "Bad request! Supply POST data: name, email and password",
            code: 401
        })
    let users = [];
    User.findOne({email: req.body.email}).then(oldUser => 
    {
        if (oldUser)
            return res.json({errors: "Email already exists", code: 427});
        user.name = req.body.name ? req.body.name : user.name;
        user.email = req.body.email;
        user.passwordHash = req.body.password;
        const token = jwt.sign({email: user.email, id: user._id}, APP_SECRET)
        user.save(function (err)
        {
            if (err)
                 res.json(err);
            res.json(
            {
                message: 'New user created!',
                data: 
                {
                    name: user.name,
                    email: user.email,
                    password: user.passwordHash,
                    token
                }
            });
        });
    });
};
// Handle view user info
exports.login = function (req, res) 
{
    User.findById(req.params.user_id, function (err, user) 
    {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
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
user.name = req.body.name ? req.body.name : user.name;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.phone = req.body.phone;
// save the user and check for errors
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