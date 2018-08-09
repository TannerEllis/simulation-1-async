const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const app = express();
const controller = require('./controller');

app.use(bodyParser.json());
require('dotenv').config();

massive(process.env.CONNECTION_STRING)
.then((db)=> {
    console.log('database connected')
    app.set('db', db)
}).catch(err => console.log(err))


const port = 3007;


//Shelves
app.get('/api/shelf/:id', controller.getShelf)

//Bins
app.get('/api/bin/:id', controller.getBin)

app.put('/api/bin/:id', controller.updateBin)

app.delete('/api/bin/:id', controller.deleteBin)

app.post('/api/bin/:id', controller.createBin)


app.listen(port, () => console.log('Listening on port', port))

