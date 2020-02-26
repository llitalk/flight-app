const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api');
const { connectToSocket } = require('./socket');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/api', cors(), api);

app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));

const http = require('http').Server(app);
connectToSocket(http);

http.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});