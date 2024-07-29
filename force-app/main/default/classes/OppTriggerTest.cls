@istest
public class OppTriggerTest {
    public void trigtest(){
        Account acc = new Account();
        acc.Name = 'test acc';
        acc.Rating = 'Cold';
        insert acc;
        
        Opportunity opp = new Opportunity();
        opp.name = 'Test opp';
        opp.AccountId = acc.id;
        opp.StageName = 'Closed Won';
        insert opp;
      
        test.startTest();  
		Account account = [Select id,rating from account where id =: opp.AccountId];
		
		system.assertequals(account.Rating,'hot');
		test.stopTest();
        
    }
}