const router = require('express').Router();
const userController = require('./controllers/userController.js');
const itemsController = require('./controllers/itemsController.js');

router.get('/', function (req, res) 
{
	res.setHeader("Content-Type", "text/html");
    res.end(`
    	<p style="">Official docummentation for this API could be found at <br />
    	<a href="https://jaycodist.github.io/muses-backend-docs" target="_self">
    	https://jaycodist.github.io/muses-backend-docs</a><p>`);
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