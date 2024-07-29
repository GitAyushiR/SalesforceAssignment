({
      // Fetch the accounts from the Apex controller
      getAccountList: function(component) {
        var action = component.get('c.listOfAccounts');
        // Set up the callback
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.isLoading", false);
                var resultHistory=response.getReturnValue();
                component.set("v.onDelete",true);
                console.log('deleteRecord'+JSON.stringify(resultHistory));
            }else if (state === "ERROR") {
                var errors = response.getError();
                
            }
        });
        $A.enqueueAction(action); 
    }
    })