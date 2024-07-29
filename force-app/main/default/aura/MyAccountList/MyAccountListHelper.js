({
    // Fetch the accounts from the Apex controller
      getAccountList: function(component) {
        var action = component.get('c.getAccount');
        // Set up the callback
        
        action.setCallback(this, function(actionResult) {
         component.set('v.accounts', actionResult.getReturnValue());
        });
        $A.enqueueAction(action);
      }
})