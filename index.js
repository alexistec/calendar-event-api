const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Create server express
const app = express();

//DATABASE
dbConnection();

//CORS
app.use(cors());

//Public Direct
app.use( express.static('public') )

//Parser Body
app.use( express.json() )

//Listening request
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

app.listen(process.env.PORT, ()=> {
    console.log(`Server found port 4000 ${ process.env.PORT }`)
})