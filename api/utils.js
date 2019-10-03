const jwt = require('jsonwebtoken');
const User = require('./models/user.js');
const APP_SECRET = "muses is bae";


const getUser = req =>
{
	const Authorization = req.header("Authorization");
	if (Authorization)
	{
		const token = Authorization.replace("Bearer ", "");
		try
		{
			const {id} = jwt.verify(token, APP_SECRET);
			const user = User.findOne({_id: id});
			return user;
		}
		catch(err)
		{
			return Promise.reject(err);
		}
	}
}

module.exports = { APP_SECRET, getUser };