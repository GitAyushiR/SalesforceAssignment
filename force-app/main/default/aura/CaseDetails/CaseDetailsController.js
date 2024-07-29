({
    doInit : function(component, event, helper) {
        var action = component.get("c.oppDetail");
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                component.set("v.oppData",response.getReturnValue());
            } 
            else{
                console.log( "Error");
            }
        });
        $A.enqueueAction(action);                     
    }
})