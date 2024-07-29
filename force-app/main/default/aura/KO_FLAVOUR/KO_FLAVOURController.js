({
    doInit : function(component, event, helper) {
        var brandVariantID = component.get("v.brandVariantID");
        console.log('BrandVariantID-->'+brandVariantID);
        if(brandVariantID != '' && brandVariantID != null && brandVariantID != undefined){            
            helper.getDSSConfigRecords(component, event, helper);             
        }       
    },
     enableEditPage : function(component, event, helper) {
        component.set("v.isEDITEnabled", true);
    },

    
    cancelEditPage: function(component, event, helper) {
        component.set("v.isEditModeEnabled", false);
        component.set("v.isSave",false);
		helper.getDSSConfigRecords(component,event,helper);        
    },
    
    saveRecords : function(component, event, helper){  
        var header = component.get("v.header");
        var description = component.get("v.description");
        
        description= description.replace(new RegExp('&lt;', 'g'), '<');
        description= description.replace(new RegExp('&gt;', 'g'), '>');
        
        //var header = document.getElementById("header").value;    
        //var description = document.getElementById("textChange").value;    
        var dssConfigList = component.get("v.dssConfigList");
        var updatedData = []; 
        component.set("v.isEDITEnabled", false);
        for(var i = 0; i < dssConfigList.length; i++){ 
             if(dssConfigList[i].DSS_ContentType__c == 'Text' && dssConfigList[i].DSS_ContentTypeValue__c == 'Description' && dssConfigList[i].DSS_Description__c != description){
                 dssConfigList[i].DSS_Description__c = description;
                 component.set("v.description",description);
                 updatedData.push(dssConfigList[i]);
                 component.set("v.isSave",true);
             }
            else if(dssConfigList[i].DSS_ContentType__c == 'Text' && dssConfigList[i].DSS_ContentTypeValue__c == 'Header' && dssConfigList[i].DSS_Description__c != header){
                 dssConfigList[i].DSS_Description__c = header;
                 component.set("v.header",header);
                 updatedData.push(dssConfigList[i]);
                 component.set("v.isSave",true);
             }
            else if(dssConfigList[i].DSS_ContentType__c == 'Image'){    
                updatedData.push(dssConfigList[i]); 
                component.set("v.isSave",true);
            }
                    
        }
        if(component.get("v.isSave")){
                helper.saveRecordHelper(component, event, helper, updatedData);
            }
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
})