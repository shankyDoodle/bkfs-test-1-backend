'use strict';

const express = require('express')
const cors = require('cors');
const fs = require('fs')

const bodyParser = require('body-parser');
// const process = require('process');
// const url = require('url');
// const queryString = require('querystring');

const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const LoadData = require("./load-data");
let myData = new LoadData();
myData.prepareData()

const port = 9090


const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())

app.get('/customerList', (req, res) => res.send(myData.customerList));

app.get('/documentTypes', (req, res) => res.send(myData.documentTypes));

app.post('/selectedCustomerData', (req, res) => {
    let selectedCustomerIds = req.body.selectedCustomerIds;

    let allCustomerData = myData.customerData;
    let toSend = {};
    for(let cust of selectedCustomerIds){
        toSend[cust] = allCustomerData[cust];
    }
    console.log(toSend);

    res.send(toSend)
});


app.get('/getSingleDocumentSample', (req, res) => {
    let docId = req.query.documentId;

    // let allDocumentSamples = myData.documentSamples;
    // let toSend = {};
    // for(let docId of selectedDocumentIds){
    //     toSend[docId] = allDocumentSamples[docId];
    // }
    // res.send(toSend)
});

app.post('/selectedDocumentSamples', (req, res) => {
    let selectedDocumentIds = req.body.selectedDocumentTypeIds;

    let allDocumentSamples = myData.documentSamples;
    let toSend = {};
    for(let docId of selectedDocumentIds){
            toSend[docId] = allDocumentSamples[docId];
    }
    res.send(toSend)
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
