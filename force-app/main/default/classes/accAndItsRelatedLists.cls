public class accAndItsRelatedLists {
    
    @auraenabled
    public static AccountWrapper accountAndRelatedLists(){
        List<Account> accList = [Select id,name,(Select Id,Name from Contacts),(Select Id,CaseNumber from Cases),(Select Id,name from Account_Plans__r ),type from Account where name = 'Pickles Productions'];
        AccountWrapper accwrap;
        for(Account acc : accList){
            accwrap = new AccountWrapper();
            accwrap.conList = acc.contacts;
            accwrap.caseList = acc.cases;
            accwrap.accPlanList = acc.Account_Plans__r;
            accwrap.AccType = acc.Type;
        }
        system.debug(accwrap);
        return accwrap;
    }
    
    public class AccountWrapper{
        @auraenabled public List<Contact> conList;
        @auraenabled public List<Case> caseList;
        @auraenabled public List<Account_Plan__c> accPlanList ; 
        @auraenabled public String AccType ; 
    }
    
}