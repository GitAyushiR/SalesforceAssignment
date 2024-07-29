@isTest
public class MyAccountTest 
{
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
        System.assertEquals ( Integer.valueOf(acc.phone) ,123450);
	}

}