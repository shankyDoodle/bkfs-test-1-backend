'use strict';

const express = require('express')
const cors = require('cors');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

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
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());

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

app.post('/addNewCustomer', (req, res) => {
    let newId = uuidv4()
    let oNewCustomer = {
        id: newId,
        label: req.body.newCustomerName,
    }
    myData.customerList[newId] = oNewCustomer

    myData.customerData[newId] = {};
    let toSend = {
        customerList:myData.customerList,
        newCustomer:oNewCustomer
    }
    res.send(toSend)
});

app.post('/addNewDocumentType', (req, res) => {
    let newId = uuidv4()
    let oNewDocument = {
        id: newId,
        label: req.body.newDocumentTypeName,
    }
    myData.documentTypes[newId] = oNewDocument

    myData.groupedDocElementsMap[newId] = [];
    let toSend = {
        documentTypes:myData.documentTypes,
        newDocumentType:oNewDocument
    }
    res.send(toSend)
});


app.post('/addNewDocumentSample', (req, res) => {
    if (req.files === null) {
        return res.status(BAD_REQUEST).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    let docId = req.body.documentId;
    let sPath = `${__dirname}/uploads/${file.name}`;
    file.mv(sPath, err => {
        if (err) {
            console.error(err);
            return res.status(SERVER_ERROR).send(err);
        }

        let bitmap = fs.readFileSync(sPath);
        let sBase64 = new Buffer(bitmap).toString('base64');
        myData.documentSamples[docId] = sBase64

        res.send(sBase64);
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))