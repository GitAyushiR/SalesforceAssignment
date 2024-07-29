trigger TrigAccount on Account (after insert,after update) {
     Set<id> accIds = new set<id>();
    Contact con;
    for(account acc : trigger.new){
         con = new Contact(FirstName = 'Info',LastName = 'Default',Email = 'info@websitedomain.tld');
          //acc.Only_Default_Contact__c = TRUE;
        accIds.add(acc.id);
    }
    insert con;
    List<Contact> conList = [Select id,name from contact where accountId in: accIds ];
    system.debug(conList);
    if(conlist.size() >= 1){
    for(account ac : trigger.new){
        ac.Only_Default_Contact__c = False;
    }
    }
     
}