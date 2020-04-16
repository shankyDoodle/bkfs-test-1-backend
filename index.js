'use strict';

const express = require('express')
const cors = require('cors');
const fs = require('fs')

const bodyParser = require('body-parser');

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
    res.send(toSend)
});

app.post('/updateCustomerData', (req, res) => {
    let dirtyCustomerData = req.body.dirtyCustomerData;
    Object.assign(myData.customerData, dirtyCustomerData);
    res.send("success")
});

app.get('/getSampleDocument', (req, res) => {
    let docId = req.query.documentId;
    let allDocumentSamples = myData.documentSamples;
    let toSend = allDocumentSamples[docId];
    res.send(toSend)
});

app.get('/getGroupedDocumentElements', (req, res) => {
    let docId = req.query.documentId;
    let oAllGroups = myData.groupedDocElementsMap;
    let toSend = oAllGroups[docId];
    res.send(toSend);
});

app.get('/getAllGroupsCSVData', (req, res) => {
    let oAllGroups = myData.groupedDocElementsMap;
    let documentTypesDict = myData.documentTypes;
    let docIds = Object.keys(documentTypesDict);

    let maxLength = -Infinity;
    let aElementsWrapper = [];
    for(let i=0; i<docIds.length; i++){
        let aDocElements = [];
        let aAllGroupsForThisDoc = oAllGroups[docIds[i]];
        for(let j=0; j<aAllGroupsForThisDoc.length; j++){
            let oGroup = aAllGroupsForThisDoc[j];
            let allElementsInThisGroup = oGroup.dataElements;
            aDocElements = aDocElements.concat(allElementsInThisGroup);
        }
        maxLength = Math.max(aDocElements.length, maxLength);
        aElementsWrapper.push(aDocElements);
    }

    let ans = [];

    let aDocLabels = docIds.map(id=>documentTypesDict[id].label);
    ans.push(aDocLabels);

    let i=0;
    while(i<maxLength){
        let temp = [];
        for(let j=0; j<aElementsWrapper.length;j++){
            if(aElementsWrapper[j][i]){
                temp.push(aElementsWrapper[j][i])
            }else{
                temp.push("");
            }
        }
        ans.push(temp);
        i++;
    }
    res.send(ans);
});


app.post('/saveGroupedDocumentElements', (req, res) => {
    let docId = req.body.selectedDocumentId;
    myData.groupedDocElementsMap[docId] = req.body.groupedDocumentElements;
    res.send("success")
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))