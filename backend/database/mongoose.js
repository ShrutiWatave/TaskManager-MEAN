const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //For including promises while connecting to db

mongoose.connect('mongodb://127.0.0.1:27017/taskmanager',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true

    }

)
    .then(() => console.log("Connected to mongodb"))
    .catch((error) => console.log(error));

module.exports = mongoose;