const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const dal = require('../dal/dal');

const register = express.Router();

register.post('/', async (req, res) => {
    const { firstname, lastname, username, password } = req.body;

    const getUserQuery = `SELECT * from user where userName = "${username}"`;
    let [user] = await dal.execute(getUserQuery);

    if (user) {
        res.status(500).json({ error: 'USER_EXIST' });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUserQuery = `INSERT INTO user VALUES(null, '${firstname}', '${lastname}', '${username}', '${hashPassword}', '')`;
    const result = await dal.execute(newUserQuery);

    if (!result || !result.insertId) {
        res.status(500).json({ error: 'USER_ERROR' });
        return;
    }

    [user] = await dal.execute(getUserQuery);

    const token = jwt.sign({ id: user.id }, 'catsecret', { expiresIn: '1h' });

    delete user.password;

    res.json({ user, token });
});

module.exports = register;
