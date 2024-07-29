({
     doInit : function(component, event, helper) { 
        
        helper.getDSSConfigRecords(component, event, helper);		 
        
    },
    
    enableEditPage: function(component, event, helper) {
        component.set("v.isEditModeEnabled", true);
    },
    cancelEditPage: function(component, event, helper) {        
        component.set("v.isEditModeEnabled", false);
        component.set("v.isSave",false);
        helper.getDSSConfigRecords(component, event, helper);        
    },
    setBackgroundImgID : function(component, event, helper){        
        var dssConfigList = component.get("v.dssConfigList");
        var imgID = event.getParam("backGroundImageID");         
        var dssRecordID = event.getParam("dssRecordID");        
        
        if(imgID != null && imgID != ''){            
            for(var i = 0;i<dssConfigList.length;i++){                
                if(dssConfigList[i].Id.toString() === dssRecordID){
                    dssConfigList[i].DSS_ImageDocumentID__c = imgID;
					component.set("v.isSave",true);                    
                    break;
                }
            }            
            helper.setData(component,event,helper,dssConfigList);
            component.set("v.dssConfigList",dssConfigList);                     
        }
    },  
    saveEditPage : function(component, event, helper) {
        debugger;
        component.set("v.isEditModeEnabled", false);
       // var backGroundImageID = component.get("v.backGroundImageID");
       // var logoImage = component.get("v.logoImage");
        //var accoladesImagesID1 = component.get("v.accoladesImagesID1");
       /** var desc1 = document.getElementById("desc1").value;
        var desc2 = document.getElementById("desc2").value;
        var desc3 = document.getElementById("desc3").value;
        var desc4 = document.getElementById("desc4").value;
        var source = document.getElementById("source").value;
        var accdesc1 = document.getElementById("accdesc1").value;
        var supscript1 = document.getElementById("supscript1").value;
        component.set("v.Description1",desc1);
        component.set("v.Description2",desc2);
        component.set("v.Description3",desc3);
        component.set("v.Description4",desc4);
        component.set("v.sourceText",source);
        component.set("v.AccoladesDesc1",accdesc1);
        component.set("v.supscript1",supscript1);**/
        
        var desc1 =  component.get("v.Description1");
        var desc2 =  component.get("v.Description2");
        var desc3 =  component.get("v.Description3");
        var desc4 =  component.get("v.Description4");
        var desc5 =  component.get("v.Description5");
        var source = component.get("v.sourceText");
        var accdesc1 =  component.get("v.AccoladesDesc1");
        var dssConfigList = component.get("v.dssConfigList");
       
        var updatedData = [];
        for(var i = 0; i < dssConfigList.length; i++){            
            if(dssConfigList[i].DSS_ContentType__c==='Text' && dssConfigList[i].DSS_ContentTypeValue__c === 'Description' && dssConfigList[i].DSS_Sequence__c===1){
                if(dssConfigList[i].DSS_Description__c != desc1){
                desc1= desc1.replace(new RegExp('&lt;', 'g'), '<');
                desc1= desc1.replace(new RegExp('&gt;', 'g'), '>');
                dssConfigList[i].DSS_Description__c = desc1;
                component.set("v.Description1",desc1);
                component.set("v.isSave",true);
            }
            if(dssConfigList[i].DSS_Source__c != source){
                source= source.replace(new RegExp('&lt;', 'g'), '<');
                source= source.replace(new RegExp('&gt;', 'g'), '>');
                dssConfigList[i].DSS_Source__c = source;
                component.set("v.sourceText",source);
                component.set("v.isSave",true); 
            }
        }
             
            else if(dssConfigList[i].DSS_ContentType__c==='Text' && dssConfigList[i].DSS_ContentTypeValue__c === 'Description' && dssConfigList[i].DSS_Sequence__c === 2 && dssConfigList[i].DSS_Description__c != desc2){                
                desc2= desc2.replace(new RegExp('&lt;', 'g'), '<');
                desc2= desc2.replace(new RegExp('&gt;', 'g'), '>');
                dssConfigList[i].DSS_Description__c  = desc2;
                component.set("v.Description2",desc2);
                component.set("v.isSave",true);
            }
            else if(dssConfigList[i].DSS_ContentType__c==='Text' && dssConfigList[i].DSS_ContentTypeValue__c === 'Description' && dssConfigList[i].DSS_Sequence__c === 3 && dssConfigList[i].DSS_Description__c != desc3){
                    desc3= desc3.replace(new RegExp('&lt;', 'g'), '<');
                     desc3= desc3.replace(new RegExp('&gt;', 'g'), '>');
                	 dssConfigList[i].DSS_Description__c  = desc3;
                     component.set("v.Description3",desc3);
                     component.set("v.isSave",true);
            } 
           else if(dssConfigList[i].DSS_ContentType__c==='Text' && dssConfigList[i].DSS_ContentTypeValue__c === 'Description' && dssConfigList[i].DSS_Sequence__c === 4 && dssConfigList[i].DSS_Description__c != desc4){
                     desc4= desc4.replace(new RegExp('&lt;', 'g'), '<');
                     desc4= desc4.replace(new RegExp('&gt;', 'g'), '>');
                	 dssConfigList[i].DSS_Description__c  = desc4;
                     component.set("v.Description4",desc4);
                     component.set("v.isSave",true);
            } 
            else if(dssConfigList[i].DSS_ContentType__c==='Text' && dssConfigList[i].DSS_ContentTypeValue__c === 'Description' && dssConfigList[i].DSS_Sequence__c === 5 && dssConfigList[i].DSS_Description__c != desc5){
                     desc4= desc4.replace(new RegExp('&lt;', 'g'), '<');
                     desc4= desc4.replace(new RegExp('&gt;', 'g'), '>');
                	 dssConfigList[i].DSS_Description__c  = desc5;
                     component.set("v.Description5",desc5);
                     component.set("v.isSave",true);
            }
            else if(dssConfigList[i].DSS_ContentType__c==='Text' && dssConfigList[i].DSS_ContentTypeValue__c === 'Accolades Text' ){
                if(dssConfigList[i].DSS_Description__c != accdesc1){ 
                    accdesc1= accdesc1.replace(new RegExp('&lt;', 'g'), '<');
                    accdesc1= accdesc1.replace(new RegExp('&gt;', 'g'), '>');
                	dssConfigList[i].DSS_Description__c  = accdesc1;
                   // dssConfigList[i].DSS_ImageDocumentID__c = accoladesImagesID1;
                    component.set("v.AccoladesDesc1",accdesc1);
                    component.set("v.isSave",true);
                }
                /**if(dssConfigList[i].DSS_Superscript__c != supscript1){
                    dssConfigList[i].DSS_Superscript__c  = supscript1;
                    component.set("v.supscript1",supscript1);
                  	component.set("v.isSave",true);
                
                }**/
                
                    //updatedData.push(dssConfigList[i]);
            } 

         }
       if(component.get("v.isSave")){
       helper.saveDSSConfigRecords(component, event, helper, dssConfigList); 
       helper.getDSSConfigRecords(component, event, helper);
       }
    }    
           
       
})