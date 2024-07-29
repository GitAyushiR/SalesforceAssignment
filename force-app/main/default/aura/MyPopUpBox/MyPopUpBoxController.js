({
   
   closeModel: function(component, event, helper) 
    {
      // for Hide/Close Model,set the "isOpen" attribute to "False"  
      component.set("v.isOpen", false);
        
       var  cancelEvent = component.getEvent("cancelEvent");
       cancelEvent.fire();  
   	},
 
   Filter: function(component,event,helper)
    { 
        
        var cmpEvent = component.getEvent("cmpEvent");
        cmpEvent.setParams
        ({
        	"parameter": component.find("parameter").get("v.value"),
        	"type" : component.find("type").get("v.value"),
        	"value" : component.find("value").get("v.value")
           
    }); 
        
       cmpEvent.fire(); 
       component.set("v.isOpen", false);
        
    }
    
})