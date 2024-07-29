public class Account_Contact_Details {
  
    @auraEnabled
    public static List<Account> ListOfAccounts(){
        List<Account> AccountList = [Select Id,Name FROM Account Order By Name];
        system.debug('AccountList is '+AccountList);
       return AccountList;
    }
    @auraEnabled
    public static List<Contact> ListOfContact(String AccountName){
        List<Contact>  ContactList = [Select Id,Name,AccountId FROM Contact where Account.Name = :AccountName ];
        system.debug('ContactList is '+ContactList);
        return ContactList;
    }
}