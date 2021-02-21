const fetch = require('../node_modules/node-fetch');

const { UNSPLASH, 
        GET_CONFIG } = require('./Constants');

const { makeObj } = require('./MakeObj')


// RETURNS A PROMISE
// Either await the result (async function), or treat as promise with
// .then() chaining syntax
const getAllResults = (queryTerm) => 
    fetch(`${UNSPLASH}/search/photos?query=${queryTerm}`, GET_CONFIG)
        .then(res => res.json())
        .then(data => makeObj(data.results));

module.exports = {
    getAllResults
}