public class AccountProcessor {
    
    @future
    public static void countContacts(List<Id> accIds){
        List<Account> accUpdate = new List<Account>();
        
        List<Account>  accrec = [Select ID,name ,(Select Id,name from Contacts) from Account where Id in : accIds];
        for(Account acc : accrec){
            list<Contact> conlist = new list<Contact>(acc.contacts);
            acc.Number_Of_Contacts__c = conlist.size();
            accUpdate.add(acc);
        }
        if(!accUpdate.isEmpty()){
            update accUpdate;
        }
    }

}