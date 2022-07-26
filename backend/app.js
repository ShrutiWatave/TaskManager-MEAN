const express = require('express');
const cors = require('cors');
const mongoose = require('./database/mongoose');
const List = require('./database/models/list');
const Task = require('./database/models/task');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running");
})

//CRUD for Lists
app.get('/lists', (req, res) => {
    List.find({})
        .then((lists) => res.send(lists))
        .catch((error) => res.status(400).json('Error: ' + error));
});

app.post('/lists', (req, res) => {
    const newList = new List({
        'title': req.body.title
    });
    newList.save()
        .then((list) => res.send(list))
        .catch((error) => res.status(400).json('Error: ' + error));
});

app.get('/lists/:listId', (req, res) => {
    List.find({ _id: req.params.listId })
        .then((list) => res.send(list))
        .catch((error) => res.status(400).json('Error: ' + error))
});

app.patch('/lists/:listId', (req, res) => {
    List.findOneAndUpdate(
        { '_id': req.params.listId },
        { $set: req.body })
        .then((list) => res.send(list))
        .catch((error) => res.status(400).json('Error: ' + error));
});


app.delete('/lists/:listId', (req, res) => {
    //Deleting all the tasks associated with that particular list
    const deleteListTasks = (list) => {
        Task.deleteMany({ _listId: list._id })
            .then(() => list)
            .catch((error) => res.status(400).json('Error: ' + error));
    }

    List.findByIdAndDelete(req.params.listId)
        .then((list) => res.send(deleteListTasks(list)))
        .catch(error => res.status(400).json('Error: ' + error));
})

//CRUD for Tasks
app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    })
        .then((tasks) => res.send(tasks))
        .catch(error => res.status(400).json('Error: ' + error));
});

app.post('/lists/:listId/tasks', (req, res) => {
    const newTask = new Task({
        _listId: req.params.listId,
        title: req.body.title,
    });

    newTask.save()
        .then((task) => res.send(task))
        .catch((error) => res.status(400).json('Error: ' + error));
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.find({
        _listId: req.params.listId,
        _id: req.params.taskId
    })
        .then((task) => res.send(task))
        .catch((error) => res.status(400).json('Error: ' + error));
});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate(
        { '_listId': req.params.listId, '_id': req.params.taskId },
        { $set: req.body }
    )
        .then((task) => res.send(task))
        .catch((error) => res.status(400).json("Error: " + error));
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndDelete({
        _listId: req.params.listId,
        _id: req.params.taskId
    })
        .then((task) => res.send(task))
        .catch((error) => res.status(400).json('Error: ' + error));
});