public class AccountUtility {
    public static void viewAnnualRevenue(){
        String acctRev;
        List<Account> accountsList = [select name ,Id,AnnualRevenue from Account ];
        for(Account acc: accountsList){
            acctRev = acc.Name + ':' + acc.AnnualRevenue;
            system.debug(acctRev);
        }
    }
}