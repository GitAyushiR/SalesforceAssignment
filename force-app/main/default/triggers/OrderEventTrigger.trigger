trigger OrderEventTrigger on Order_Event__e (after insert) {
 // List to hold all cases to be created.
    List<Task> tasks = new List<Task>();
    // Iterate through each notification.
    for (Order_Event__e event : Trigger.New) {
        if (event.Has_Shipped__c == true) {
            // Create Case to dispatch new team.
            Task cs = new Task();
            cs.Priority = 'Medium';
            cs.Subject = 'Follow up on shipped order 105 ';
            cs.OwnerId = event.CreatedById;
            tasks.add(cs);
        }
   }
    // Insert all cases corresponding to events received.
    insert tasks;
}