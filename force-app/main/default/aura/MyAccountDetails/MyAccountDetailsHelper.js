({
     
      getAccountinfo: function(component) {
        var action = component.get('c.getAccount');
        // Set up the callback
        var self = this;
        action.setCallback(this, function(actionResult) {
         component.set('v.accounts', actionResult.getReturnValue());
         //component.set('v.account', actionResult.getReturnValue());  
            
        });
        $A.enqueueAction(action);
      }
    })