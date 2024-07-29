public class AccountList {
    
    @AuraEnabled
    public static List<Account> listOfAccounts(){
        List<Account> accList = [Select id,name from Account Limit 10];
        return accList;
    }

}