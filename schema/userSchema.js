const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    myImage: String
});

module.exports = mongoose.model(('user'), user_schema);