const express = require('express');
const jwt = require('jsonwebtoken');
const dal = require('../dal/dal');
const bcrypt = require('bcrypt');

const login = express.Router();

login.post('/', async (req, res) => {
    const { username, password } = req.body;

    const findUserQuery = `SELECT * from user where username = "${username}";`;

    const [user] = await dal.execute(findUserQuery);
    if (!user) {
        res.status(500).json({ error: 'USER_NOT_FOUND' });
        return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(500).json({ error: 'PASSWORD_INVALID' });
        return;
    }
    const token = jwt.sign({ id: user.id }, 'catsecret', { expiresIn: '1h' });

    delete user.password;

    res.json({ user, token });
});

module.exports = login;
