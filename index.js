require('dotenv').config();
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const RouteUser     = require('./routes/User');
const mongoose      = require('mongoose');
const cors          = require('cors');
const PORT          = process.env.PORT || 3000;
app.use(cors())

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
app.use('/', RouteUser)

app.listen(process.env.PORT, (req,res) => {
    console.log(`Server run at PORT ${process.env.PORT} or localhost://${PORT}`)
})