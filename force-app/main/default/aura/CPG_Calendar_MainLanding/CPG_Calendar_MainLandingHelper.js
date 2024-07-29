({
	fireDetailRequestEvent : function(component, helper, selectedMonth,isDetailsCmpActive) {
        var componentEvent = component.getEvent("detailsRequestEvent");
        componentEvent.setParams({
            "selectedMonth" : selectedMonth,
            "isDetailsCmpActive": isDetailsCmpActive
        });
        componentEvent.fire();
	}
})