function FixPhoneNumbers(csvData){
	this.csvData = csvData;
	this.typeMap = {
		bracket:this.fixBracketNum,
		number:this.fixNumberNum,
		ext:this.fixExtensionNum
	};
}

FixPhoneNumbers.prototype.fixBracketNum = function(phoneNum){

};

FixPhoneNumbers.prototype.fixNumberNum = function(phoneNum){

};

FixPhoneNumbers.prototype.fixExtensionNum = function(phoneNum){

};

FixPhoneNumbers.prototype.getNumberType = function(phoneNum){
	let cleanedNum = phoneNum.replace(",","");
	let bracketRegex = /\(|\)/g;
	let numRegex = /\d{10}|\d{11}/g;
	let extensionRegex = /x|\*|EXT|EX/gi;
	if(extensionRegex.test(phoneNum)){
		return "ext"
	}
	else if(numRegex.test(phoneNum)){
		return "number"
	}
	else if(bracketRegex.test(phoneNum)){
		return "bracket"
	}
	else{
		return null;
	}

};

FixPhoneNumbers.prototype.checkNumbers = function() {
	for(let i = 1;i < this.csvData.length;i++){
		let phoneNum = this.csvData[i][12];
		let numberType = this.getNumberType(phoneNum);
		console.log("phone number and type: ",numberType,phoneNum);
	}
};