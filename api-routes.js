const router = require('express').Router();
const userController = require('./userController.js');


router.get('/', function (req, res) {
    res.json({
        status: 'Test',
        message: 'Testing',
    });
});
// Contact routes
router.route('/login').post(userController.login);
router.route('/signup').post(userController.signup);
// Export API routes
module.exports = router;