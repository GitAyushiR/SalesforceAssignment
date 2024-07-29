@isTest
public class FilterTestClass {
	 static testMethod void testAccountList ()
     {
	 	List<Account> accounts = new List<Account>();
	 	for (Integer count = 0; count < 50; count++) 
     		{
	 			accounts.add(new Account (Name = 'Jack'+count,AccountNumber='123456' +count, Phone ='12345'+count));
                
	 		}
		insert accounts;
		
        Test.startTest();
        MyAccountClass.getAccount();
   		Test.stopTest();
         
        Account ACC = [select Name,AccountNumber ,phone from Account LIMIT 1];
		System.assertEquals ( String.valueOf(acc.Name) ,'Jack0');
     }
    
     static testMethod void testgetAccountList()
     {
        List<Account> accounts = new List<Account>();
	 	for (Integer count = 0; count < 50; count++) 
     		{
	 			accounts.add(new Account (Name = 'Ginni'+count,AccountNumber='CC123' +count, Phone ='1234568'+count));
	 		}
		insert accounts;
        
        Test.startTest();
        MyAccountClass.getAccountList('Name','Equals','Ginni0');
        MyAccountClass.getAccountList('Name','Contains','G0');
        MyAccountClass.getAccountList('Phone','Contains' , '120');
        MyAccountClass.getAccountList('Name','Starts With' , 'G');
        MyAccountClass.getAccountList('Name','Ends With' , '0');
   		Test.stopTest();
         
         Account ACC1 = [select Name,AccountNumber ,phone from Account LIMIT 1];
        System.assertEquals ( String.valueOf(acc1.AccountNumber) ,'CC1230');
        System.assertEquals ( String.valueOf(acc1.Phone) ,'12345680');
    }
    
}