({
    getDSSlogos	:  function(component,event,helper, brandVariantID){   
       
        var action = component.get("");
        action.setParams({ 
            "brandVariantID" : brandVariantID,
            "sectionName"	:	'Header'            
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var logoData = response.getReturnValue();
                for(var i =0; i<logoData.length;i++){
                    console.log('ContentType value-->'+logoData[i].DSS_ContentTypeValue__c);
                    if(logoData[i].DSS_ContentTypeValue__c ==='Header Logo' && logoData[i].DSS_ImageDocumentID__c != '' && logoData[i].DSS_ImageDocumentID__c != null){                        
                        console.log("v.logoImageID"+logoData[i].DSS_ImageDocumentID__c);
                        component.set("v.logoImageID",logoData[i].DSS_ImageDocumentID__c);
                    }
                    else if(logoData[i].DSS_ContentTypeValue__c ==='Hamburger Logo' && logoData[i].DSS_ImageDocumentID__c != '' && logoData[i].DSS_ImageDocumentID__c != null){                        
                        component.set("v.hamburgerImageID",logoData[i].DSS_ImageDocumentID__c);
                        
                    }
                }
            }
        });
        $A.enqueueAction(action);    
    },
    
    getAccountStates : function(component,event,helper, accountId){
        console.log('accountId11-->'+accountId);
        var action = component.get("c.getAccountDepletion");
        action.setParams({ 
            "accountId" : accountId         
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
            	var isDepletion = response.getReturnValue();
                component.set("v.isDepletion",isDepletion);
                console.log('isDepletion-->'+isDepletion);
            }
        });
        $A.enqueueAction(action);
    },
    
    trackPdfUsage : function(component, event, pageName, isPdf){
        //console.log('value in page name '+pageName + ' isPdf '+isPdf);
        var action = component.get("c.DssUsageTrack");
        action.setParams({ pageName : pageName,
                          isPdf : isPdf,
                          brandId : component.get("v.brandVariantID")
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                console.log('Dss usage repository inserted ');
                
            }
            else if (state === "INCOMPLETE") {
                console.log('status is incomplete');
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action); 
    }

    
})