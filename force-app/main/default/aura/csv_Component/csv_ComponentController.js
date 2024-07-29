({     
    showfiledata :  function (component, event, helper){
    component.set("v.Error_Records",'');
    component.set("v.Success_Records",'');
        
    var fileInput = component.find("file").getElement();
    var file = fileInput.files[0];
    if (file) {
        component.set("v.showcard", true);
        //console.log("File");
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var csv = evt.target.result;
            var table = document.createElement("table");
            var rows = csv.split("\n");
            console.log(rows[0].split(','));
            console.log('##', rows.length);
            component.set('v.Header',rows[0].split(','));
            component.set('v.end',rows[0].split(',').length)
            var dataarray=[];
            for(var i=1;i<rows.length;i++){
                dataarray.push(rows[i].split(','));
            }
            window.setTimeout(function(){  helper.DataCsv(component, Event, helper,dataarray); }, 1000);
            var phone = 
                console.log('!!', phone);
            /*var dataarray=[];
                for(var i=1;i<rows.length;i++){
                            dataarray.push(rows[i].split(','));
                }
                component.set('v.Data',dataarray);
                console.log(component.get('v.Data'));*/
                //for (var i = 0; i < rows.length; i++) {
                //var cells = rows[i+1].split(",");
                //console.log('^^^', cells);
                //component.set('v.Data', cells);
                /* if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                        }
                    }
                }*/
                // var divCSV = document.getElementById("divCSV");
                //  divCSV.innerHTML = "";
                // divCSV.appendChild(table);
                //  }
                //reader.onerror = function (evt) {
                //console.log("error reading file");
            }
        }
}, 
  
  onsave :function(component, event, helper) {   
      var action = component.get('c.getCustomSettingData');
      action.setCallback(this, function(response){
          
          var state = response.getState();
          if (state === "SUCCESS") {
              var errorRecords=0;
              var header=component.get('v.Header');
              var search=header.indexOf('Phone');
              var nameField=header.indexOf('Name');
              var count=0;
              var customdata=response.getReturnValue();
              var siz=customdata.length;
              var index=0;
              console.log( '&&&'+response.getReturnValue());
              var a=response.getReturnValue();
              //var filter=JSON.stringify(response.getReturnValue()).split(',');
              //console.log(typeof filter);
              console.log( '### '+component.get('v.Header'));
              while(siz>0){
                  console.log(a[index]);
                  console.log(header[index]);
                  if(a[index].trim()===header[index].trim())
                  {
                      count++;
                  }
                  else{
                      break;
                  }
                  siz--;
                  index++;
              }
              console.log(count);
              if(count == customdata.length){
                  //success
                  alert('Columns sequence is right');
                
                  var myaction=component.get('c.saveData');
                 debugger;
                  console.log("Data"+JSON.stringify(component.get("v.Data")));
                  myaction.setParams({"records":JSON.stringify(component.get("v.Data"))});
                 myaction.setCallback(this, function(response){
          			var state = response.getState();
                   if (state === "SUCCESS") { 
                       
                  var response = response.getReturnValue();
                       component.set("v.ListofAccName",response);
                       console.log('ListofAccName'+component.get("v.ListofAccName"));
                  }
                     else{
                         var error=response.getError();
                         console.log(' state error'+error[0].message);
                     }
                 });
                  $A.enqueueAction(myaction);
                  var list=component.get('v.Data');
                  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                  var x = document.getElementById("data").getElementsByTagName("tr");
                  for(var i=0;i<list.length;i++){
                      var inputtxt=list[i][search];
                      var inputValueForName =list[i][nameField];
                      if(inputtxt!=undefined){
                          if(inputtxt.match(phoneno)||inputtxt=='') {
                              console.log('checked');
                              console.log(inputtxt);
                              
                          }
                          else {
                              console.log('wrong');
                              x[i+1].getElementsByTagName("td")[1].style.backgroundColor="red";
                              x[i+1].getElementsByTagName("td")[1].style.color="white";
                              errorRecords++;
                          } 
                      
                    if (inputValueForName!=undefined && inputValueForName!=''){
                          console.log('checked');
                              console.log(inputtxt);
                     }  
                         else {
                              console.log('Name Field Should Not be Null');
                              x[i+1].getElementsByTagName("td")[0].style.backgroundColor="red";
                              x[i+1].getElementsByTagName("td")[0].style.color="white";
                              errorRecords++;
                          } 
                      
                      } 
                  }
              }
              else{
                  //error  
                  alert('Please provide valid data');
              }
              component.set("v.Error_Records",errorRecords);
              component.set("v.Success_Records",parseInt(component.get("v.Total_Records")) - parseInt(component.get("v.Error_Records")));
              
          }
      });
      $A.enqueueAction(action);
  },
   
    downloadCsv : function(component,event,helper){

        var action = component.get("c.fetchAccount");
        action.setParams({ 
           "ListofAccName" : component.get("v.ListofAccName")
        });
         console.log('ListofAccName--'+component.get("v.ListofAccName"));
      
         action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                debugger;
                var AccNameList = response.getReturnValue();
                component.set('v.ListOfAccount', AccNameList);
                console.log('ddd', AccNameList);
            }
        });
        $A.enqueueAction(action);
        
        var reqData= component.get('v.ListOfAccount');
        var csv = helper.convertToCSV(component,reqData);   
        if (csv == null){
            return;
        } 
        var downloaddata = document.createElement('a');
        downloaddata.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        downloaddata.download = 'ExportCSVData.csv';  
        document.body.appendChild(downloaddata); 
        downloaddata.click(); 
    }, 
 })