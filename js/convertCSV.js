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

ConvertCSV.prototype.buildShopifyArray = function(rows) {
	this.newShopifyData.push(this.headingRow);
	for(let i = 1;i < rows;i++){
		this.newShopifyData[i] = [];
		for(let k = 0;k < this.newShopifyData[0].length;k++){
			this.newShopifyData[i].push(",");
		}
	}
};

//need to make sure emtpy is filled with ,
ConvertCSV.prototype.convertCSV = function() {
	this.buildShopifyArray(20);
	console.log(this.commaSplitData,this.headingRow,this.newShopifyData);
	for(let i = 1;i < 20;i++){
		let rowData = [];
		for(let k = 0;k < this.commaSplitData[i].length;k++){
			//handle tags
			if(k === 17 && this.commaSplitData[i][k] !== ","){
				if(this.commaSplitData[i][k].includes(":")){
					let splitData = this.commaSplitData[i][k].split(":");
					this.newShopifyData[i][16] = splitData[1].trim();
				}
				else{
					this.newShopifyData[i][16] = this.commaSplitData[i][k];
				}
			}
			//handle mapping
			if(this.netsuiteToShopifyMap[k] || this.netsuiteToShopifyMap[k] === 0){
				//handle first name absence
				if(k === 27 && this.commaSplitData[i][k] === ","){
					this.newShopifyData[i][0] = this.commaSplitData[i][0];
				}
				else{
					let column = this.netsuiteToShopifyMap[k];
					this.newShopifyData[i][column] = this.commaSplitData[i][k];
				}
				
			}
		}			
	}

	console.log("new data ===================",this.newShopifyData);

	return this.newShopifyData;
};