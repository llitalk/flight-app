const express = require('express');

const login = require('./controllers/login-controllers');
const register = require('./controllers/register-controllers');
const vacation = require('./controllers/vacation-controllers');
const api = express.Router();

api.use('/login', login);
api.use('/register', register);
api.use('/vacation', vacation);

module.exports = api;
