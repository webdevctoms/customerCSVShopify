function App(dropZoneID,downloadID,testButtonID,convertButtonID){
	this.csvDropZone = document.getElementById(dropZoneID);
	this.downloadLink = document.getElementById(downloadID);
	this.testButton = document.getElementById(testButtonID);
	this.convertButton = document.getElementById(convertButtonID);

	this.commaSplitData;
	this.captureCSV = new CaptureCSV();

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

};

App.prototype.runTests = function(){
	console.log("run tests");
	try{
		Tests.checkLength(this.commaSplitData,this.commaSplitData[0].length);
		Tests.checkRemovedCustomer(this.customerRemovedArr,this.emptyIndex);
		Tests.checkRemovedCustomer(this.customersToRemove,this.emptyIndex,true);
		Tests.checkFilteredCustomer(this.filterData,this.nameArray,this.editItemCodes.itemCodeIndex);

	}
	catch(err){
		console.log("error testing ",err);
	}
};

App.prototype.convertClicked = function(){
	console.log("convert data");
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
		this.commaSplitData = commaSplitData;
		console.log(this.commaSplitData);
		
	})

	.catch(err => {
		console.log("error reading file", err);
	});
	//console.log(this.commaSplitData);
};

let app = new App("drop_zone","downloadLink","testData","convertData");