({
    getDSSConfigRecords : function(component,event,helper) {
        
        var action = component.get("c.getRecords");
        action.setParams({ 
            "brandVariantID" : component.get("v.brandVariantID"),
            "sectionName":'Heritage & Accolades'
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var dssrecords= response.getReturnValue();
                component.set("v.dssConfigList",dssrecords);
                //helper.setBackgroundImageID(component,event,helper,component.get("v.dssConfigList"));  
                 helper.setData(component,event,helper,component.get("v.dssConfigList"));  
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log('@@Errors' + JSON.stringify(errors));
            }
        });
        $A.enqueueAction(action);
    },    
  saveDSSConfigRecords : function(component, event, helper,dssConfigList){
        var action = component.get("c.saveDSSConfigs");
        action.setParams({
            // "lstDSSConfig" : component.get("v.dssConfigList") 
            "lstDSSConfig" : dssConfigList
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var errorMsg = 'Changes have been saved successfully!';
                var errorType ='success';
                helper.showMessageGeneric(component,event,helper, errorMsg, errorType);                                                  
            }
        });
        $A.enqueueAction(action);
    },
     setData : function(component,event,helper,dssrecords) {
        for(var i=0;i<dssrecords.length;i++){
            console.log('dssrecs'+dssrecords.length);
            if(dssrecords[i].DSS_ContentType__c=='Text'&& dssrecords[i].DSS_ContentTypeValue__c=='Description'){
                if(dssrecords[i].DSS_Sequence__c===1){
                   component.set("v.Description1",dssrecords[i].DSS_Description__c);
                   component.set("v.sourceText",dssrecords[i].DSS_Source__c);
                }
                else if(dssrecords[i].DSS_Sequence__c===2){
                    component.set("v.Description2",dssrecords[i].DSS_Description__c);
                }
               else if(dssrecords[i].DSS_Sequence__c===3){
                    component.set("v.Description3",dssrecords[i].DSS_Description__c);
                }
               else if(dssrecords[i].DSS_Sequence__c===4) {
                        component.set("v.Description4",dssrecords[i].DSS_Description__c);
                    } 
                else if(dssrecords[i].DSS_Sequence__c==5){
                         component.set("v.Description5",dssrecords[i].DSS_Description__c);
                     }
            }
            if(dssrecords[i].DSS_ContentType__c=='Text'&& dssrecords[i].DSS_ContentTypeValue__c=='Accolades Text'){ 
                    component.set("v.AccoladesDesc1",dssrecords[i].DSS_Description__c);
                   
                }
            if(dssrecords[i].DSS_ContentType__c=='Image' && dssrecords[i].DSS_ContentTypeValue__c == 'Background Image'){
                      if(dssrecords[i].DSS_Sequence__c===1){ 
                    component.set("v.backGroundImageID",dssrecords[i].DSS_ImageDocumentID__c); 
                    //component.set("v.oldbackGroundImageID",dssConfigList[i].DSS_ImageDocumentID__c);                                
                      }
                    else if(dssrecords[i].DSS_Sequence__c===2){
                    component.set("v.backGroundImageID1",dssrecords[i].DSS_ImageDocumentID__c);
                }
                    else if(dssrecords[i].DSS_Sequence__c===3){
                    component.set("v.backGroundImageID2",dssrecords[i].DSS_ImageDocumentID__c);
                }
            }
                 if(dssrecords[i].DSS_ContentType__c=='Image' && dssrecords[i].DSS_ContentTypeValue__c== 'Accolades'){
                     if(dssrecords[i].DSS_Sequence__c===1){
                      component.set("v.accoladesImagesID1",dssrecords[i].DSS_ImageDocumentID__c);   
                    //component.set("v.oldbackGroundImageID",dssConfigList[i].DSS_ImageDocumentID__c);                                
                     }
                     if(dssrecords[i].DSS_Sequence__c===2){
                      component.set("v.logoImage",dssrecords[i].DSS_ImageDocumentID__c);   
                    //component.set("v.oldbackGroundImageID",dssConfigList[i].DSS_ImageDocumentID__c);                                
                     } 
                }              
                    //component.set("v.oldbackGroundImageID",dssConfigList[i].DSS_ImageDocumentID__c);        
                }
        }
    
})