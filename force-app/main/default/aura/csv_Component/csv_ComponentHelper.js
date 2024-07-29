({
	DataCsv : function(component, Event, helper,dataarray){
        component.set('v.Data',dataarray);
        
        component.set("v.Total_Records",dataarray.length);
        
        console.log('v.Data-----'+component.get('v.Data'));
        },
    
    convertToCSV : function(component,objectRecords){
        var csvStringResult, counter, keys, columnDivider, lineDivider;
        if (objectRecords == null || !objectRecords.length) {
            return null;
        }
        
        columnDivider = ',';
        lineDivider =  '\n';
        keys = ['Name','Phone','AccountNumber' ];
        csvStringResult = '';
        csvStringResult += keys.join(columnDivider);
        csvStringResult += lineDivider;
        
        for(var i=0; i < objectRecords.length; i++){   
            counter = 0;            
            for(var sTempkey in keys) {
                var skey = keys[sTempkey]; 
                if(counter > 0){ 
                    csvStringResult += columnDivider; 
                } 
                
                if(objectRecords[i][skey] != undefined){
                    csvStringResult += '"'+ objectRecords[i][skey]+'"'; 
                }else{
                    csvStringResult += '"'+ '' +'"';
                }
                counter++;       } 
            csvStringResult += lineDivider;
        }
        return csvStringResult; 
        
    }
})