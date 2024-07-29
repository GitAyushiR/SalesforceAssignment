public class AccountsController {
      @AuraEnabled
    public static list<account> getAccounts()
    {
       return [select Id, name, industry, Type, NumberOfEmployees, TickerSymbol, Phone from  Account ORDER BY createdDate ASC ];
    }
   

}