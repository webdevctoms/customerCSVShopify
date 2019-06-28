function FixPhoneNumbers(csvData){
	this.csvData = csvData;
	this.typeMap = {
		bracket:this.fixBracketNum,
		number:this.fixNumberNum,
		ext:this.fixExtensionNum
	};
}

FixPhoneNumbers.prototype.fixBracketNum = function(phoneNum){
	return phoneNum.replace(/\(|\)/g,"").replace(" ","-");
};

FixPhoneNumbers.prototype.fixNumberNum = function(phoneNum){
	let tenPattern = /\d{10}/g;
	let elevenPattern = /\d{11}/g;
	let newNum = phoneNum;
	if(elevenPattern.test(phoneNum)){
		newNum = phoneNum.slice(0,1) + "-" + phoneNum.slice(1,4) + "-" + phoneNum.slice(4,7) + "-" + phoneNum.slice(7,phoneNum.length);
	}
	else if(tenPattern.test(phoneNum)){
		newNum = phoneNum.slice(0,3) + "-" + phoneNum.slice(3,6) + "-" + phoneNum.slice(6,phoneNum.length);
	}

	return newNum;
};

FixPhoneNumbers.prototype.fixExtensionNum = function(phoneNum){
	let extAdjustedNum = phoneNum.replace(/\s{1}[ext]{2,3}\.{0,1}\s{0,1}\-{0,1}\d{3,}/gi,"");
	let xAdjustedNum = extAdjustedNum.replace(/\s{1}[x]{1}\s{0,1}\d{3,4}/gi,"");
	let bracketAdjustedNum = xAdjustedNum.replace(/\(|\)/g,"").replace(" ","-");
	console.log("bracketAdjustedNum=====================================================",bracketAdjustedNum);
	return bracketAdjustedNum;
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
		if(numberType !== null){
			let fixedNum = this.typeMap[numberType](phoneNum);
			console.log("new num: ",fixedNum);
			this.csvData[i][12] = fixedNum;
		}		
	}

	return this.csvData;
};

FixPhoneNumbers.prototype.removePhone = function() {
	for(let i = 1;i < this.csvData.length;i++){
		this.csvData[i][12] = ",";	
	}

	return this.csvData;
};