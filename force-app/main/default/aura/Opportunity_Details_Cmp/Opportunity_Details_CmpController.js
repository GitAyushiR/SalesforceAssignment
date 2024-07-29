({
	getOpportunityList : function(component, event, helper) {
        var action = component.get("c.ListOfOpportunity");
        //var action = component.get("c.getDetailsOfOpp");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS"){
                var result = response.getReturnValue();
                console.log(result);
                var finalValues = [];
                for(var stageName in result){
                    finalValues.push({key: stageName, value: result[stageName]});
                }
                component.set("v.OppValues", finalValues);
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                
            }
        });
        $A.enqueueAction(action);
    },
})