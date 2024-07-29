trigger OppTrigger on Opportunity (After insert,After update) {
    Set<Id> oppAccId = new set<Id>();
    for(Opportunity opp : trigger.new){
        if(opp.StageName == 'Closed Won'){
        oppAccId.add(opp.AccountId);
        }
    }
    List<Account> AccId = [Select id,name ,rating from Account where id =: oppAccId ];
    List<Account> accList = new List<Account>();
    
    for(Account acc: AccId){
    acc.Rating = 'Hot';
        accList.add(acc);
    }
    update accList;
     
}