var sys = require('sys');
var exec = require('child_process').exec;

var config = require('./config');

//webapp
var express = require('express');
var http = require('http');
var app = express();
app.use(express.cookieParser());
app.use(express.session({
    secret: '1234567890QWERTY',
    cookie: {
        expires: new Date(Date.now() + 60 * 30000), // 30 minutes
        maxAge: 60*30000
    }
}));

app.configure(function(){
    app.use(express.bodyParser());
});

var server = http.createServer(app);

var path = require('path');
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000}));
app.use(express.static(path.join(__dirname, 'core/client'), {maxAge: 86400000}));

//app.set('views', __dirname + 'core/client');
app.engine('html', require('ejs').renderFile);
app.get('/', function(req, res){
    res.render(config.client_dir + '/index.html');
});

var loginController      = require('./core/server/loginController');
var AuthenticatedRequest = require('./core/server/services/authenticatedRequest');
var accountsController = require('./core/server/accountsController');

/*
var transactionController = require('./controllers/transactionController');
var welcomeController = require('./controllers/welcomeController');
var userController = require('./controllers/userController');
*/

//set up the login controllers:
app.post('/api/login', loginController.login);
app.get('/api/logout', AuthenticatedRequest(loginController.logout));
app.post('/api/signup', loginController.signup);

//accounts endpoints
app.get('/api/accounts', AuthenticatedRequest(accountsController.list));
app.post('/api/accounts', AuthenticatedRequest(accountsController.createAccount));

/*
app.get('/accounts/:account/transactions', AuthenticatedRequest(transactionController.list));
app.post('/accounts/:account/transactions', AuthenticatedRequest(transactionController.add));
app.get('/accounts/:account/transactions/add', AuthenticatedRequest(transactionController.viewAdd));

app.delete('/accounts/:account/transactions/:transaction/rev/:rev', AuthenticatedRequest(transactionController.delete));


app.get('/users', loginController.isAdmin, userController.list);

app.get('/', welcomeController.welcome);
*/

var serverPort = config.web.port || 1337;
server.listen(serverPort);
console.log('server listening on: ' + serverPort);
