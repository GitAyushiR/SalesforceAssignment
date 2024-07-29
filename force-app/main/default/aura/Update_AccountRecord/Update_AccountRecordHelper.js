({
    fetchDefaultValues: function(component, event, helper){
        var action = component.get("c.getAccount");
        action.setParams({"accountId": component.get("v.recordId")});
		action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state'+state);
            if(component.isValid() && state === "SUCCESS") {
                component.set("v.account", response.getReturnValue());
                console.log('response'+response.getReturnValue());
            } else {
                console.log('Problem getting account, response state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    fetchPicklistValues: function(component, event, helper){
        var action = component.get("c.getPicklistValues");
        
		action.setCallback(this, function(response) {
            var state = response.getState();
           
            if(component.isValid() && state === "SUCCESS") {
                var result =response.getReturnValue();
                var picklist_values =[];
              
                console.log('response'+response.getReturnValue());
                for(var key in result){
                    picklist_values.push({key: key, value: result[key]});
                }
                component.set("v.mapOfValues", picklist_values);
                console.log('picklist_values'+JSON.stringify(picklist_values));
               // debugger;
            }
            else {
                console.log('Problem getting account, response state: ' + state);
            }
            });
      
        $A.enqueueAction(action);
    },
    
    updateDetails : function(component, event, helper){
        var action = component.get("c.updatedValues");
		action.setParams({
            "accountId":component.get('v.recordId'),
            "Industry":component.find("Industry").get("v.value"),
            "Ownership" :component.find("Ownership").get("v.value"),
            "Type" :component.find("Type").get("v.value"),
            "Employees" :component.find("Employees").get("v.value"),
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state'+state);
            if(component.isValid() && state === "SUCCESS") {

        /* var resultsToast = $A.get("e.force:showToast");
                console.log("resultsToast"+resultsToast);
                    resultsToast.setParams({
                        "title": "Fields Updated",
                        "message": "The changes have been updated successfully."
                    });
					$A.get("e.force:closeQuickAction").fire();
                    resultsToast.fire();
                   $A.get("e.force:refreshView").fire();*/
                }
                else if (state === "ERROR") {
                    console.log('Problem saving contact, response state: ' + state);
                }
                else {
                    console.log('Unknown problem, response state: ' + state);
                }
               });
        $A.enqueueAction(action);
    }
    
    
})