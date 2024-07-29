({
    doInit : function(component, event, helper) {
		 helper.fetchDefaultValues(component, event, helper); 
        helper.fetchPicklistValues(component, event, helper);
        
    },

    SaveRecord: function(component, event, helper) {
     // debugger;
      helper.updateDetails(component, event, helper);
         $A.get("e.force:closeQuickAction").fire();
         var resultsToast = $A.get("e.force:showToast");
                console.log("resultsToast"+resultsToast);
                    resultsToast.setParams({
                        "title": "Fields Updated",
                        "message": "The changes have been updated successfully."
                    });
					$A.get("e.force:closeQuickAction").fire();
                    resultsToast.fire();
                   
         $A.get('e.force:refreshView').fire();
    },

	Cancel: function(component, event, helper) {
	    $A.get("e.force:closeQuickAction").fire();
    }
})