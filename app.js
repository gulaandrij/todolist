var express = require('express');
var app = express();
var todoController = require('./controllers/todoControllers');
var helmet = require('helmet');

app.set('view engine', 'ejs');

app.use(express.static('./public/assets'));
app.use(helmet());

todoController(app);

app.listen(3000);
console.log('listening :3000 ');
