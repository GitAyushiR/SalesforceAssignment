public class MyAccountClass1 {
  

	@auraEnabled
	public static list<account> getAccount()
    {
       list<account> ac =[select Name,Phone,OwnerId,AccountNumber FROM Account limit 1 ];
		return ac;
    }

}