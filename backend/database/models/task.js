const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        trim: true
    },

    _listId: {    //Each task would be mapped to a particular list item, so we need the collection id
        type: mongoose.Types.ObjectId,
        required: true
    },

    completed: {
        type: Boolean,
        default: false,
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;