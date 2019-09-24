const router = require('express').Router();
const userController = require('./controllers/userController.js');
const itemsController = require('./controllers/itemsController.js');

router.get('/', function (req, res) {
    res.json({
        status: 'Test',
        message: 'Testing',
    });
});
// App routes
router.route('/login').post(userController.login);
router.route('/signup').post(userController.signup);
router.route('/items').get(itemsController.index)
	.post(itemsController.new)
    .patch(itemsController.update)
    .put(itemsController.update)
    .delete(itemsController.delete);
// Export API routes
module.exports = router;