const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
var flag=false;
var join="";
var sorted=[];
var sum;

var temp={};
console.log(sum);
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
	else if((header[i]=="Particulars")|| (header[i]=="3-2003")||(header[i]=="3-2004")||(header[i]=="3-2005")||(header[i]=="3-2006")||(header[i]=="3-2007")||(header[i]=="3-2008")||(header[i]=="3-2009")||(header[i]=="3-2010")||(header[i]=="3-2011")||(header[i]=="3-2012")||(header[i]=="3-2013")||(header[i]=="3-2014"))
	{
			//console.log(head1.indexOf(lineRecords[0]));

                //int k=3;
               
                //console.log(sum);
                
			if(lineRecords[0].indexOf("Rice") > -1) 
			{
				if(lineRecords[0].indexOf("Karnataka") >  -1||lineRecords[0].indexOf("Tamil Nadu") > -1 ||lineRecords[0].indexOf("Kerala") > -1 ||lineRecords[0].indexOf("Andhra Pradesh") >  -1)
				{
				//console.log(lineRecords[3]);
		tempData[header[i]]=lineRecords[i].replace("!",",").replace(/["]/g,"").replace("NA",0);

			/*sum=0;
			for(var i=13;i<=24;i++)
			{ 


					//console.log(lineRecords[i]);
					lineRecords[i]=lineRecords[i].replace("NA","0");
                  sum=sum+parseFloat(lineRecords[i],10);
                  //console.log(sum);
	          
			}

          tempData["Year"]=sum.toString();*/
          //tempData["Particulars"]=tempData[header[i]];
		//console.log(tempData.length);
		
			console.log(tempData);
				dataflag=true;
			}
		}
		
		//tempData[header[i]]=tempData[header[i]].replace("!",",").replace(/["]/g,"");
		
		
			}         
	}
 

	if(dataflag)
	{
		jsonData.push(tempData);
	}
	isHeader=false;	

	fs.writeFileSync("bar4.json",JSON.stringify(jsonData),encoding="utf8");

	tempData={};
	join="";
});