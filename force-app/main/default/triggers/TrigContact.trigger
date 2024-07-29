trigger TrigContact on Contact (after insert,after update) {
    Map<Id,Account> accList = new Map<Id,Account>();
    Set<Id> accId =  new Set<Id>();
    for (contact c : trigger.new){
        accId.add(c.AccountId);
    }
    for(Account acc : [Select id,name,Active_Subscriptions__c from Account where id =: accId]){
        for(contact c : [select id,phone,name from contact where AccountId =: acc.id]){
          if(acc.Active_Subscriptions__c != NULL){
           acc.Active_Subscriptions__c = acc.Active_Subscriptions__c + 1;   
              accList.put(acc.id,acc);
              }
            else{
                acc.Active_Subscriptions__c = 1;
                accList.put(acc.id,acc);
            }
          }
    }
    if(accList.values().size() > 0) {
    update accList.values();
}
}