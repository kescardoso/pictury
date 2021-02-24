// IMPORTS
const express = require('express')
var cors = require('cors')

const { PORT } = require('./Constants');
const { getAllResults } = require('./helperFunctions/GetPage')

// INIT APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json())

// ROUTES
// BASE URL
app.get('/', (req, res) => {
  res.json({msg: 'Server Root URL'})
})

// GETQUERY PATH
// URL TAKES 1 PARAM: ?searchTerm=__termToBeSearched__
app.get('/getQuery/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;

    let data = await getAllResults(searchTerm);
    console.log(data);

    res.json(data);
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server Running`)
})