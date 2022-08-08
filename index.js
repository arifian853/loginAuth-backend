require('dotenv').config();
var http            = require('http');
var httpProxy       = require('http-proxy');
var proxy           = httpProxy.createProxyServer({});
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const RouteUser     = require('./routes/User');
const mongoose      = require('mongoose');
const cors          = require('cors');
const PORT          = process.env.PORT || 3001;

app.use(cors())

http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'https://www.herokuapp.com' });
}).listen(3000);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(res => {
    console.log('Database Connected !')
})

.catch(e => {
    console.log('Database ERROR !')
})

app.use(bodyParser.json());
app.use("",RouteUser)

app.listen(process.env.PORT, (req,res) => {
    console.log(`Server run at PORT ${process.env.PORT} or localhost://${PORT}`)
})