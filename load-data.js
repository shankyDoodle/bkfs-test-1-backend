const fs = require('fs')
var csvjson = require('csvjson');

let baseDirectory = "./providedData/";

class LoadData {
    constructor() {
        this.customerList = {};
        this.originalClassificationCustomerData={};
        this.customerData={};
        this.groupedDocElementsMap={}
        this.documentTypes={}
        this.documentSamples = {}
    }

    _prepareCustomerListData(){
        let customerFileMapRaw = fs.readFileSync(baseDirectory+'customers-file-map.json');
        this.customerList = JSON.parse(customerFileMapRaw);
    }

    _prepareCustomerDataData(){
        let classificationsPath = baseDirectory+"classifications/";
        let aFiles = fs.readdirSync(classificationsPath);
        let _this = this;

        for(let i=0; i<aFiles.length;i++){
            let sFileToRead = aFiles[i];
            let csvDataString = fs.readFileSync(classificationsPath+sFileToRead, { encoding : 'utf8'});
            let jsonArray = csvjson.toObject(csvDataString);
            let customerName = sFileToRead.split(".")[0];
            _this.originalClassificationCustomerData[customerName] = jsonArray;

            let temp={}
            for(let oData of jsonArray){
                temp[oData["Document Type"]] = oData["Customer Document Type"]
            }
            _this.customerData[customerName] = temp;
        }
    }

    _prepareDocumentTypesAndSamplesData(){
        let documentTypesRaw = fs.readFileSync(baseDirectory+'documents-file-map.json');
        this.documentTypes = JSON.parse(documentTypesRaw);
        for(let sDocType in this.documentTypes){
            if(!!this.documentTypes[sDocType]){
                let pdfPath = baseDirectory+this.documentTypes[sDocType];
                this.documentSamples[sDocType] = fs.readFileSync(pdfPath);
            }
        }
    }

    _prepareGroupedDocElementsMap() {
        let extractionCSVFilePath = baseDirectory + "extractions/data-elements.csv";
        let csvDataString = fs.readFileSync(extractionCSVFilePath, {encoding: 'utf8'});
        let jsonArray = csvjson.toObject(csvDataString);

        for (let sKey in this.documentTypes) {
            let aFiltered = jsonArray.filter(oData => oData["Document Type"] === sKey);
            let oGroups = {};
            for (let oFiltered of aFiltered) {
                let sCurrentGroupId = oFiltered['Group Number'];
                if (!oGroups[sCurrentGroupId]) {
                    oGroups[sCurrentGroupId] = {}
                    oGroups[sCurrentGroupId].groupId = sCurrentGroupId;
                    oGroups[sCurrentGroupId].objectInfo = [];
                }
                oGroups[sCurrentGroupId].objectInfo.push(oFiltered);
            }

            let aAllGroups = [];
            for (let sGroupId in oGroups) {
                let oGroup = oGroups[sGroupId];
                let aObjectData = oGroup.objectInfo;
                let aElements = aObjectData
                    .sort((oA, oB) => oA["Datapoint Order"] - oB["Datapoint Order"])
                    .map(oA => oA["Data Elements"]);

                let oTemp = {};
                oTemp.groupId = oGroup.groupId;
                oTemp.dataElements = aElements
                aAllGroups.push(oTemp);
            }

            this.groupedDocElementsMap[sKey] = aAllGroups;
        }
    }


    prepareData(){
        this._prepareCustomerListData();
        this._prepareCustomerDataData();
        this._prepareDocumentTypesAndSamplesData();
        this._prepareGroupedDocElementsMap();
        console.log("hi");
    }

}

module.exports=LoadData