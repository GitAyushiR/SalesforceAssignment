({ 

   handleComponentEvent : function(cmp, event,helper) { 
debugger;
   var message = event.getParam("message"); 

   // set the handler attributes based on event data 

   cmp.set("v.messageFromEvent", message); 

   },
    handleComponentEvent1: function(cmp, event,helper){
        var message = event.getParam("message"); 
  cmp.set("v.messageFromEvent", message); 
    }

} )