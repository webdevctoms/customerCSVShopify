function App(dropZoneID,downloadID,testButtonID,convertButtonID,templateDropID,phoneNumID,removePhoneID){
	this.csvDropZone = document.getElementById(dropZoneID);
	this.templateDropZone = document.getElementById(templateDropID);
	this.downloadLink = document.getElementById(downloadID);
	this.testButton = document.getElementById(testButtonID);
	this.convertButton = document.getElementById(convertButtonID);
	this.phoneNumberButton = document.getElementById(phoneNumID);
	this.removePhoneButton = document.getElementById(removePhoneID);

	this.newShopifyData;
	this.templateHeadingLength = 19;
	this.commaSplitData;
	this.numFixer;
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

	this.phoneNumberButton.addEventListener("click",function(e){
		e.preventDefault();
		this.phoneClicked();
	}.bind(this),false);

	this.removePhoneButton.addEventListener("click",function(e){
		e.preventDefault();
		this.removePhoneClicked();
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
		Tests.checkLength(this.newShopifyData,this.newShopifyData[0].length);
		Tests.checkTags(this.newShopifyData);
	}
	catch(err){
		console.log("error testing ",err);
	}
};

App.prototype.phoneClicked = function(){
	console.log("phone data");
	try{
		this.numFixer = new FixPhoneNumbers(this.commaSplitData);
		this.newNumData = this.numFixer.checkNumbers();
		let csvData = this.createBlob(this.newNumData);
		this.createDownload(csvData,this.downloadLink);
	}
	catch(err){
		console.log("error converting ",err);
	}
	
};

App.prototype.removePhoneClicked = function(){
	console.log("phone data");
	try{
		this.numFixer = new FixPhoneNumbers(this.commaSplitData);
		this.newNumData = this.numFixer.removePhone();
		let csvData = this.createBlob(this.newNumData);
		this.createDownload(csvData,this.downloadLink);
	}
	catch(err){
		console.log("error converting ",err);
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
		lineArray.push(row);	
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
		//console.log(commaSplitData[0].length,commaSplitData[0].length === this.templateHeadingLength);
		console.log(commaSplitData);
		if(commaSplitData[0].length === this.templateHeadingLength){
			this.converter.setHeadingRow(commaSplitData);
			this.commaSplitData = commaSplitData;
		}
		else{
			this.commaSplitData = commaSplitData;
			this.converter.setData(commaSplitData);
		}
	})

	.catch(err => {
		console.log("error reading file", err);
	});
};

let app = new App("drop_zone","downloadLink","testData","convertData","template_drop_zone","phoneData","phoneDataRemove");