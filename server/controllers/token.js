const jwt = require('jsonwebtoken');
const dal = require('../dal/dal');

const tokenRequire = async (req, res, next) => {
    let authorization = req.headers['authorization'];
    if (!authorization) return res.sendStatus(401);

    const [type, token] = authorization.split(' ');
    if (!type || !token) return res.sendStatus(401);

    jwt.verify(token, 'catsecret', async (err, decoded) => {
        if (err) return res.sendStatus(401);

        req.decoded = decoded;
        const { id } = decoded;

        const getUserQuery = `SELECT * from user where id = "${id}"`;
        let [user] = await dal.execute(getUserQuery);
        if (!user) return res.sendStatus(401);

        req.user = user;
        next();
    });
};

module.exports = { tokenRequire };
