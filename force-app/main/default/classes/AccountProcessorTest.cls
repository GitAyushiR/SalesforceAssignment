@istest
public class AccountProcessorTest {
	@istest
    public static void testmethod1(){
        List<Id> accIds = new List<Id>();
        Account acc=new Account(Name = 'test acc');
        insert acc;
        Contact con = new Contact(FirstName = 'test',LastName = 'Contact',accountId = acc.Id);
        insert con;
        accIds.add(acc.Id);
        test.startTest();
        AccountProcessor.countContacts(accIds);
            test.stopTest();
    }
        
}