const fetch = require('../node_modules/node-fetch');
const { 
    UNSPLASH, 
    GET_CONFIG
} = require('./Constants');
const {
    makeObj
}
= require('./MakeObj')


const getAllResults = () => {
    fetch(`${UNSPLASH}/search/photos?query=dogs`, GET_CONFIG)
        .then(res => res.json())
        .then(data => {
            makeObj(data.results)
        });
}

getAllResults()