const mongoose = require('mongoose');
// Setup schema
const userSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Item model
const Item = module.exports = mongoose.model('item', userSchema);
module.exports.get = function (callback, limit) {
    Item.find(callback).limit(limit);
}