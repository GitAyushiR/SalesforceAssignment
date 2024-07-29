trigger TrigOpportunity on Opportunity (before update) {
    for(opportunity op : trigger.new){
        if(op.StageName == 'CLosed Won'){
            op.CloseDate = date.Today();
            op.Type = 'New Customer';
        }
    }
}