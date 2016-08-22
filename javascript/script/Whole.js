const readline = require('readline');
const fs = require('fs');
var header =[];
var jsonData=[];
var tempData={};
var isHeader=true;
var insidequotes=false;
var temprow="";
const rl = readline.createInterface({
 input: fs.createReadStream('Production-Department_of_Agriculture_and_Cooperation.csv')
});


rl.on('line', function(line) {

    for (var i = 0; i <= line.length; i++) 
     {
        if(line.charAt(i) == "\""){
            if(insidequotes){
                insidequotes = false;
            }else{
                insidequotes = true;
            }
        }

        if ((line.charAt(i) == ",") && (insidequotes==true)){
            temprow=temprow+"$";
        }else{
            temprow=temprow+line.charAt(i);
        }
    }

    //console.log(temprow);

    line = temprow;

    var lineRecords= line.trim().split(',');
    for(var i=0;i<lineRecords.length;i++){
     if(isHeader){         
         header[i]=lineRecords[i];

        
     }else{
         tempData[header[i]]=lineRecords[i];
       
         tempData[header[i]]=tempData[header[i]].replace("$",",").replace(/["]/g,"");
         
        
        }         
    }
 
    tempData={};
    temprow="";
 jsonData.push(tempData);
    
    isHeader=false;
    fs.writeFileSync("data.json",JSON.stringify(jsonData),encoding="utf8");
});