@isTest
public class LeadProcessorTest {
    
    @istest
    public static void testmethod1(){
        Lead leadrec= new Lead(Company = 'Test Lead', LastName = 'Test Lead', Status = 'Open');
        insert leadrec;
        test.startTest();
         LeadProcessor uca = new LeadProcessor();
        Id batchId = Database.executeBatch(uca,200);
        test.stopTest();
    }

}