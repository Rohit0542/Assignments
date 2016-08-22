const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
var flag=false;
var join="";
var sorted=[];
const rl = readline.createInterface({
	input: fs.createReadStream('Production-Department_of_Agriculture_and_Cooperation.csv')
});


rl.on('line', function(line) {
	//console.log(lineRecords.length);
	var dataflag =false;
	for(var i=0;i<lineRecords.length;i++)
	{
		 if(isHeader)
	       { 
		header[i]=lineRecords[i].trim();
		//console.log(header[i].length+"------->"+header[i]);
		
		
		 }
	else if((header[i]=="Particulars")|| (header[i]=="3-2013"))
	{
			//console.log(head1.indexOf(lineRecords[0]));


			if(lineRecords[0].indexOf("Oilseeds") > -1)
			{
		tempData[header[i]]=lineRecords[i].replace("!",",").replace(/["]/g,"").replace("NA",0);
		//console.log(tempData.length);
		
			//console.log(tempData[header[i]]);
				dataflag=true;
			}
		
		//tempData[header[i]]=tempData[header[i]].replace("!",",").replace(/["]/g,"");
		
		
			}         
	}
 

	if(dataflag)
	{
		jsonData.push(tempData);
	}
	isHeader=false;	

	fs.writeFileSync("bar1.json",JSON.stringify(jsonData),encoding="utf8");

	tempData={};
	join="";
});