'use strict';

const express = require('express')
const cors = require('cors');
const fs = require('fs')
const csv=require('csvtojson')

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

const LoadData = require("./load-data");
let myData = new LoadData();
myData.prepareData()

// /**
//  * Data Fields i.e. My DataBase
//  */
// let customerList;
// let originalClassificationCustomerData={};
// let customerData={};
// let groupedDocElementsMap={}
// let documentTypes={}
// let documentSamples = {}
// /********************************* Data Fields end ********************************/
//
//
// /**
//  * store customerName data aka customerList
//  */
// let customerFileMapRaw = fs.readFileSync(baseDirectory+'customers-file-map.json');
// customerList = JSON.parse(customerFileMapRaw);
// /********************************* customerList data prep end ********************************/
//
//
// /**
//  * store detail customer data aka originalClassificationCustomerData && customerData
//  */
// let classificationsPath = baseDirectory+"classifications/";
// let aFiles = fs.readdirSync(classificationsPath);
// // console.log(aFiles);
// async function readCSVDirectory(aFiles) {
//     for(let i=0; i<aFiles.length;i++){
//         let sFileToRead = aFiles[i];
//         let jsonArray = await csv().fromFile(classificationsPath+sFileToRead);
//         let customerName = sFileToRead.split(".")[0];
//         originalClassificationCustomerData[customerName] = jsonArray;
//
//         let temp={}
//         for(let oData of jsonArray){
//             temp[oData["Document Type"]] = oData["Customer Document Type"]
//         }
//         customerData[customerName] = temp;
//     }
// }
// readCSVDirectory(aFiles).catch(e=>console.error(e));
// /********************************* customerData data prep end ********************************/
//
// /**
//  * store customerName data aka customerList
//  */
// let documentTypesRaw = fs.readFileSync(baseDirectory+'documents-file-map.json');
// documentTypes = JSON.parse(documentTypesRaw);
// for(let sDocType in documentTypes){
//     if(!!documentTypes[sDocType]){
//         let pdfPath = baseDirectory+documentTypes[sDocType];
//         let pdfDocRaw = fs.readFileSync(pdfPath);
//         documentSamples[sDocType] = pdfDocRaw
//     }
// }
// /********************************* customerList data prep end ********************************/
//
//
//
// /**
//  * store detail customer data aka originalClassificationCustomerData && customerData
//  */
// let extractionCSVFilePath = baseDirectory+"extractions/data-elements.csv";
// async function readExtractionCSVFile() {
//         let jsonArray = await csv().fromFile(extractionCSVFilePath);
//
//         for(let sKey in documentTypes){
//             let aFiltered = jsonArray.filter(oData=>oData["Document Type"] === sKey);
//             let oGroups = {};
//             for(let oFiltered of aFiltered){
//                 let sCurrentGroupId = oFiltered['Group Number'];
//                 if(!oGroups[sCurrentGroupId]){
//                     oGroups[sCurrentGroupId] = {}
//                     oGroups[sCurrentGroupId].groupId = sCurrentGroupId;
//                     oGroups[sCurrentGroupId].objectInfo = [];
//                 }
//                 oGroups[sCurrentGroupId].objectInfo.push(oFiltered);
//             }
//
//             let aAllGroups = [];
//             for(let sGroupId in oGroups){
//                 let oGroup = oGroups[sGroupId];
//                 let aObjectData = oGroup.objectInfo;
//                 let aElements = aObjectData
//                     .sort((oA, oB)=>oA["Datapoint Order"] - oB["Datapoint Order"])
//                     .map(oA=>oA["Data Elements"]);
//
//                 let oTemp = {};
//                 oTemp.groupId =oGroup.groupId;
//                 oTemp.dataElements = aElements
//                 aAllGroups.push(oTemp);
//             }
//
//             groupedDocElementsMap[sKey] = aAllGroups;
//         }
// }
// readExtractionCSVFile().catch(e=>console.error(e));
// /********************************* customerData data prep end ********************************/
// console.log("adjahsdgjahdgj");
// const app = express()
// const port = 9090
//
// app.get('/', (req, res) => res.send({id:1, data:"2"}))
//
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))