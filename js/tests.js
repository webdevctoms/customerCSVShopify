Tests = {
	checkLength,
	checkTags
};

function checkLength(arr,arrLength){
	console.log("checking length");
	let incorrectIndexes = [];
	for(let i = 0;i < arr.length;i++){
		try{
			if(arr[i].length !== arrLength){
				incorrectIndexes.push(i);
				console.log("error at: ",i);
			}
		}
		catch(error){
			console.log(i);
			console.log(error);
		}
		
	}

	if(incorrectIndexes.length === 0){
		console.log("Length test passed");
	}
	else{
		console.log("Length test failed");
	}
}

function checkTags(arr){
	let incorrectIndexes = [];
	console.log("checking tags");
	for(let i = 1;i < arr.length;i++){
		if(arr[i][16].includes(":")){
			incorrectIndexes.push(i);
		}
	}

	if(incorrectIndexes.length === 0){
		console.log("Tag test passed");
	}
	else{
		console.log("tag test failed");
	}
}