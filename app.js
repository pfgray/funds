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

var server = http.createServer(app);

var path = require('path');
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000}));
app.use(express.bodyParser());

var transactionController = require('./controllers/transactionController');
var loginController = require('./controllers/loginController');
var accountsController = require('./controllers/accountsController');
var welcomeController = require('./controllers/welcomeController');
var userController = require('./controllers/userController');
var AuthenticatedRequest = require('./controllers/services/authenticatedRequest');

//set up the login controllers:
app.get('/login', loginController.loginForm);
app.post('/login', loginController.login);
app.get('/logout', AuthenticatedRequest(loginController.logout));

app.get('/accounts', AuthenticatedRequest(accountsController.list));

app.get('/accounts/:account/transactions', AuthenticatedRequest(transactionController.list));
app.post('/accounts/:account/transactions', AuthenticatedRequest(transactionController.add));
app.get('/accounts/:account/transactions/add', AuthenticatedRequest(transactionController.viewAdd));
app.post('/setup_account', AuthenticatedRequest(accountsController.setupAccount));
app.post('/accounts', AuthenticatedRequest(accountsController.finalize));

app.post('/setup_signup', loginController.setupSignup);
app.post('/signup', loginController.signup);

app.delete('/accounts/:account/transactions/:transaction/rev/:rev', AuthenticatedRequest(transactionController.delete));


app.get('/users', loginController.isAdmin, userController.list);

app.get('/', welcomeController.welcome);

server.listen(config.web.port || 1337);

