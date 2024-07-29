({
      doInit: function(component, event, helper) {
        // Fetch the account list from the Apex controller
        helper.getAccountList(component);
      },
    
      myAction: function(component, event, helper)
      {
          component.set("v.condition",'true');
      },
    
   	  Cancel: function(component, event, helper)
      {
          component.set("v.condition",'false');
          helper.getAccountList(component);
      },
    
      ApplyFilter:function(component,event,helper)
      {
        	var parameter=event.getParam("parameter");
        	var type = event.getParam("type");
        	var val = event.getParam("value");
			
          
        	if(parameter!=null && val!=null && type!= null)
            { var action = component.get("c.getAccountList");
        	action.setParams
        	({
            	"parameter":parameter,
            	"type":type,
            	"value":val
        	})
       
        	action.setCallback(this,function(actionResult)
        	{
        		var state = actionResult.getState();
        		if(state === "SUCCESS")
            	{
            		component.set('v.accounts',actionResult.getReturnValue());    
            	}
         	}); 
        
        	$A.enqueueAction(action);
                component.set("v.condition",false);
            }
          else{
              alert("Fill Out The Missing Fields");
              component.set("v.condition",false);
          }
      }
})