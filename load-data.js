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
        let oCustomerListJson = JSON.parse(customerFileMapRaw);

        let oFinal = {};
        for(let sKey in oCustomerListJson){
            let oTemp = {};
            let sId = sKey.split(" ").join("_").toLocaleLowerCase();
            oTemp["id"] = sId
            oTemp["label"]=sKey;
            oTemp["fileLocation"]=oCustomerListJson[sKey];
            oFinal[sId] = oTemp
        }

        this.customerList = oFinal
    }

    _prepareCustomerDataData(){
        let customerList = this.customerList;
        for(let custId in customerList){
            let oData = customerList[custId];
            let sFilePath = baseDirectory+oData.fileLocation;
            let csvDataString = fs.readFileSync(sFilePath, { encoding : 'utf8'});
            let jsonArray = csvjson.toObject(csvDataString);
            this.originalClassificationCustomerData[custId] = jsonArray;

            let temp={}
            for(let oData of jsonArray){
                temp[oData["Document Type"]] = oData["Customer Document Type"]
            }
            this.customerData[custId] = temp;
        }
    }

    _prepareDocumentTypesAndSamplesData(){
        let documentTypesRaw = fs.readFileSync(baseDirectory+'documents-file-map.json');
        let oDocListJson = JSON.parse(documentTypesRaw);

        let oFinal = {};
        for(let sKey in oDocListJson){
            let oTemp = {};
            let sId = sKey.split(" ").join("_").toLocaleLowerCase();
            oTemp["id"] = sId
            oTemp["label"]=sKey;
            oTemp["fileLocation"]=oDocListJson[sKey];
            oFinal[sId] = oTemp
        }
        this.documentTypes = oFinal

        for(let sDocType in this.documentTypes){
            let sFileLocation = this.documentTypes[sDocType].fileLocation;
            if(!!sFileLocation){
                let pdfPath = baseDirectory + sFileLocation;
                let bitmap = fs.readFileSync(pdfPath);
                let sampleBase64 = new Buffer(bitmap).toString('base64');
                this.documentSamples[sDocType] = sampleBase64;
            }
        }
    }

    _prepareGroupedDocElementsMap() {
        let extractionCSVFilePath = baseDirectory + "extractions/data-elements.csv";
        let csvDataString = fs.readFileSync(extractionCSVFilePath, {encoding: 'utf8'});
        let jsonArray = csvjson.toObject(csvDataString);

        for (let sKey in this.documentTypes) {
            let aFiltered = jsonArray.filter(oData => oData["Document Type"].split(" ").join("_").toLocaleLowerCase() === sKey);
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
    }

}

module.exports=LoadData