({
	fireTopNavChangeEvent : function(component, helper, changeType, value,headerChangeViewGrid) {
        var componentEvent = component.getEvent("topNavChangeEvent");
        componentEvent.setParams({
            "changeType" : changeType,
            "value" : value,
            "headerChange":headerChangeViewGrid
        });
        componentEvent.fire();
	}
})