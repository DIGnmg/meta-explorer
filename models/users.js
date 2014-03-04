var mongoose = require('mongoose');

var InstagramUserSchema = new mongoose.Schema({
	igId: String,
	username: String,
	provider: String,
	token: String
});
//var IGUsers = mongoose.model('igId',InstagramUserSchema);
module.exports = mongoose.model('igId', InstagramUserSchema);