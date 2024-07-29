({
	getDSSConfigRecords : function(component,event,helper) {
        
        helper.getDSSConfigRecordsGeneric(component,"c.getRecords",
                          function(response){
                              if(response.getReturnValue().length>0){
                                  var dssrecords= response.getReturnValue();
                                  component.set("v.dssConfigList",dssrecords);                                  
                                  helper.setData(component,event,helper,component.get("v.dssConfigList"));                                                                    
                              }                              
                          },
                          {
                              brandVariantID	: component.get("v.brandVariantID"),
                              sectionName	:'Home' 
                          });
    },
    
    setData : function(component,event,helper,dssConfigList){
        for(var i = 0;i<dssConfigList.length;i++){
            if(dssConfigList[i].DSS_ContentType__c == 'Image' && dssConfigList[i].DSS_ContentTypeValue__c == 'Background Image' && dssConfigList[i].DSS_Sequence__c === 1){
                component.set("v.leftImageID1",dssConfigList[i].DSS_ImageDocumentID__c);                                               
            }
            else if(dssConfigList[i].DSS_ContentType__c == 'Image' && dssConfigList[i].DSS_ContentTypeValue__c == 'Background Image' && dssConfigList[i].DSS_Sequence__c === 2){
                component.set("v.leftImageID2",dssConfigList[i].DSS_ImageDocumentID__c);                                               
            }
            else if(dssConfigList[i].DSS_ContentType__c == 'Text' && dssConfigList[i].DSS_ContentTypeValue__c == 'Header' ){
                component.set("v.header",dssConfigList[i].DSS_Description__c);                                               
            }
            else if(dssConfigList[i].DSS_ContentType__c == 'Text' && dssConfigList[i].DSS_ContentTypeValue__c == 'Description' ){
                component.set("v.description",dssConfigList[i].DSS_Description__c);                                               
            }
        }        
    },
    saveRecordHelper : function(component, event, helper, updatedData){
        helper.getDSSConfigRecordsGeneric(component,"c.saveDSSConfigs",
                                          function(response){
                                              if(response.getState() ==="SUCCESS"){    
                                                  var errorMsg = 'Changes have been saved successfully!';
                                                  var errorType ='success';
                                                  component.set("v.isSave",false);                                                  
                                                  helper.showMessageGeneric(component,event,helper, errorMsg, errorType);                                                  
                                                  //var refreshCMP = component.get("c.doInit");
                                                  $A.enqueueAction(refreshCMP);
                                              }                              
                                          },
                                          {
                                              lstDSSConfig : updatedData
                                          });
    }
})