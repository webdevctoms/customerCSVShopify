function App(dropZoneID,downloadID,testButtonID,convertButtonID,templateDropID){
	this.csvDropZone = document.getElementById(dropZoneID);
	this.templateDropZone = document.getElementById(templateDropID);
	this.downloadLink = document.getElementById(downloadID);
	this.testButton = document.getElementById(testButtonID);
	this.convertButton = document.getElementById(convertButtonID);

	this.newShopifyData;
	this.templateHeadingLength = 19;
	this.commaSplitData;
	this.captureCSV = new CaptureCSV();
	this.converter = new ConvertCSV();
	this.initApp();
}

App.prototype.initApp = function() {
	this.csvDropZone.addEventListener("drop",function(e){
		e.preventDefault();
		this.fileDropped(e);
	}.bind(this),false);

	//need this to prevent default downloading of file
	this.csvDropZone.addEventListener("dragover",function(e){
		e.preventDefault();
	}.bind(this),false);

	this.testButton.addEventListener("click",function(e){
		e.preventDefault();
		this.runTests();
	}.bind(this),false);

	this.convertButton.addEventListener("click",function(e){
		e.preventDefault();
		this.convertClicked();
	}.bind(this),false);

	this.templateDropZone.addEventListener("drop",function(e){
		e.preventDefault();
		this.fileDropped(e);
	}.bind(this),false);

	//need this to prevent default downloading of file
	this.templateDropZone.addEventListener("dragover",function(e){
		e.preventDefault();
	}.bind(this),false);

};

App.prototype.runTests = function(){
	console.log("run tests");
	try{
		Tests.checkLength(this.commaSplitData,this.commaSplitData[0].length);

	}
	catch(err){
		console.log("error testing ",err);
	}
};

App.prototype.convertClicked = function(){
	console.log("convert data");
	try{
		this.newShopifyData = this.converter.convertCSV();
		let csvData = this.createBlob(this.newShopifyData);
		this.createDownload(csvData,this.downloadLink);
	}
	catch(err){
		console.log("error converting ",err);
	}
	
};

App.prototype.createDownload = function(csvData,downloadLink){
	downloadLink.classList.remove("hide");
	downloadLink.setAttribute("href","");
	downloadLink.setAttribute("href",csvData);
	downloadLink.setAttribute("download", "new_data.csv");
};

App.prototype.createBlob = function(arr){
	let lineArray = [];

	arr.forEach(function(rowArr,index){
		let row = rowArr.join("");
		//console.log(row);
		lineArray.push(row);	
		//lineArray.push(row);
	});
	let csvContent = lineArray.join("\n");
	let csvData = new Blob([csvContent],{type:'text/csv'});
	let csvURL = URL.createObjectURL(csvData);
	return csvURL;
};

App.prototype.fileDropped = function(event){
	let csvFile = event.dataTransfer.items[0].getAsFile();
	this.captureCSV.readFile(csvFile)

	.then(commaSplitData => {
		console.log(commaSplitData[0].length,commaSplitData[0].length === this.templateHeadingLength);
		if(commaSplitData[0].length === this.templateHeadingLength){
			this.converter.setHeadingRow(commaSplitData);
		}
		else{
			this.commaSplitData = commaSplitData;
			this.converter.setData(commaSplitData);
		}
	})

	.catch(err => {
		console.log("error reading file", err);
	});
	//console.log(this.commaSplitData);
};

let app = new App("drop_zone","downloadLink","testData","convertData","template_drop_zone");