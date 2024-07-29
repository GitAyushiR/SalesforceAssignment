({
   myAction : function(component, event, helper) {
		
	},
    //working
    ClickSmallMenu : function(component, event, helper){
        var menu = component.find("smallsidemenu");
        $A.util.toggleClass(menu, "slds-hide");
        
    },
    //working 
    changeTabSmall:function(component, event, helper){
        console.log(event.currentTarget.dataset.tabname);
        
    },
    //not working yet
    tabChange:function(component, event, helper){
        console.log(event.currentTarget.dataset.tabname);
        
    },
     
})