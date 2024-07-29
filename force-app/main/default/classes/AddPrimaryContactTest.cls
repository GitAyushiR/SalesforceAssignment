@istest
public class AddPrimaryContactTest {

    @testsetup
    static void setup(){
        List<Account> accList = new List<Account>();
        for (Integer i = 0; i <50; i++) {
            accList.add(new Account(
                name='Test Account'+i,BillingState = 'NY'
            ));}
        for(Integer i = 50; i <100; i++) {
            accList.add(new Account(
                name='Test Account'+i,BillingState = 'CA'
            ));
        
    }
        if(accList.size()>0){
           insert accList; 
        }
    }  
    @istest
    public static void testmethod1(){
        Contact co = new Contact();
         co.FirstName='demo';
         co.LastName ='demo';
         insert co;
         String state = 'CA';
      
          AddPrimaryContact apc = new AddPrimaryContact(co, state);
          Test.startTest();
            System.enqueueJob(apc);
          Test.stopTest();
         System.assertEquals(50, [select count() from Contact where accountID IN (SELECT id FROM Account WHERE BillingState = :state)]);   
    }
}