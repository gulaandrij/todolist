var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo');

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({
//     item: 'get flowless'
// }).save(function (err) {
//     if (err) throw err;
//     console.log('saved');
// });

// var data = [
//     {item: 'get milk'},
//     {item: 'walk dog'},
//     {item: 'kick ass'}
// ];

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            res.render('todo', {todo: data});
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        var newTodo = Todo(req.body).save(function (err, data) {
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function (err, data) {
           res.json(data);
        });
    });


};