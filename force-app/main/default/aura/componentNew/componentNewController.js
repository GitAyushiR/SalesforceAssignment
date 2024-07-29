({
	myAction : function(component, event, helper) {
		
	},
    EventFire:function(cmp,event){
        var NewEvent = cmp.getEvent("NewEvent");

        NewEvent.setParams({

            "message" : "A component event fired me. " 
        });

        NewEvent.fire();

    }
})