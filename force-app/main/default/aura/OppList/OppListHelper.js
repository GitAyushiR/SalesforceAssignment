({
	helperMethod : function() {
		
	},
    getOpportunityDetails: function(component) {
         var action = component.get('c.getOpportunity');
        // Set up the callback
        
        action.setCallback(this, function(actionResult) {
        component.set('v.opportunities', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
     
    }
})