'use strict';

const Hapi = require('hapi');

// connect to local sqite3 database
const Sqlite3 = require('sqlite3');
const db = new Sqlite3.Database('./dindin.sqlite');

// create Hapi server and route
const server = new Hapi.Server();
server.connection({
    port: 4000
});

// bind db object to the server
server.bind({
    db: db
});

server.route(require('./routes'));

// start the Hapi server
server.start(() => {
    console.log('[INFO] Server listening at: ', server.info.uri);
});

// retrieve records from db
/*db.all('SELECT * FROM recipes', (err, results) => {
    console.log('***Select All Recipes...');
    if (err) {
        throw err;
    }

    for (let i = 0; i < results.length; ++i) {
        console.log(results[i].name);
    }
});

// selective query
db.all('SELECT * FROM recipes WHERE cuisine = ?', ['Nigerian'],
    (err, results) => {
        console.log('***Selective Query...');
        if (err) {
            throw err;
        }
        for (let i = 0; i < results.length; ++i) {
            console.log(results[i].name);
        }   
    }
)*/