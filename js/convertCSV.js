function ConvertCSV(){
	this.commaSplitData;
	this.headingRow;
	this.newShopifyData = [];
	//key is netsuite index/column
	//value is shopify index/column
	//tags figured out by category column 17
	this.netsuiteToShopifyMap = {
		//first name
		//some customers are agencies and do not have name need check for that
		"27":0,
		//last name
		"29":1,
		//email
		"26":2,
		//company
		"19":3,
		//Shipping address 1 to address
		"38":4,
		//Shipping address 2 to address 2
		"39":5,
		//Shipping city to city
		"42":6,
		//shipping state province to province
		//possibly need a check since some of them are the province code and others the actual province
		"46":7,
		//country
		"43":9,
		//country code
		"44":10,
		//zip
		"47":11,
		//shipping phone to phone
		"45":12
	};
}

ConvertCSV.prototype.setData = function(commaSplitData) {
	this.commaSplitData = commaSplitData;
};

ConvertCSV.prototype.setHeadingRow = function(commaSplitData) {
	this.headingRow = commaSplitData[0];
};

ConvertCSV.prototype.checkTag = function() {
	
};

ConvertCSV.prototype.checkProvince = function() {
	
};

ConvertCSV.prototype.checkName = function() {
	
};

//need to make sure emtpy is filled with ,
ConvertCSV.prototype.convertCSV = function() {
	this.newShopifyData.push(this.headingRow);
	console.log(this.commaSplitData,this.headingRow);
};