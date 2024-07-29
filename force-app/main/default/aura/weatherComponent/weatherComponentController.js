({
	click : function(component, event, helper) {
		var evt = $A.get("e.force:navigateToComponent");      
    evt.setParams({
     componentDef:"c:KO_TastingNotes"
    });

evt.fire();
	},
    handleClickSmallMenu : function(component, event, helper){
        var menu = component.find("smallHamburger");
        $A.util.toggleClass(menu, "slds-hide");
        
    },
    changeTabSmall :function(component, event, helper){
        console.log(event.currentTarget.id);
},
    changePage : function(component, event, helper) {
        console.log(event.currentTarget.id);
         if(event.currentTarget.id==="tv"){
            console.log("tvvv");
             
    
    
        }
        else if(event.currentTarget.id==="digital"){
            console.log("t");
            
        }
        else if(event.currentTarget.id==="social"){
            console.log("t");
        }
        else if(event.currentTarget.id==="print"){
            console.log("t");
        }
        else if(event.currentTarget.id==="ooh"){
            console.log("t");
        }
    }
})