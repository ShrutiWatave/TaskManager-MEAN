const mongoose = require('mongoose');

//Creating schema
const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        trim: true
    }
});

//Creating model for the schema
const List = mongoose.model('List', ListSchema);

module.exports = List