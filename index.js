'use strict';

const express = require('express')
const cors = require('cors');
const fs = require('fs')
// const bodyParser = require('body-parser');
// const process = require('process');
// const url = require('url');
// const queryString = require('querystring');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

/*const {MongoClient} = require('mongodb');
async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
async function main(){
    /!**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     *!/
    const uri = "mongodb://localhost:27017/bkdb";


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);*/

let baseDirectory = "./providedData/";


let customerFileMapRaw = fs.readFileSync(baseDirectory+'customers-file-map.json');
let customerList = JSON.parse(customerFileMapRaw);
// console.log(customerList);





// const app = express()
// const port = 9090
//
// app.get('/', (req, res) => res.send({id:1, data:"2"}))
//
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))