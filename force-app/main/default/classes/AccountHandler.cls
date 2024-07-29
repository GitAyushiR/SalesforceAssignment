public class AccountHandler {
    public static void insertAccount(integer value){
        List<Account> addAccounts =new List<Account>();
        ManageConfigurationDetailsCls.WrapperDetails counterResult= ManageConfigurationDetailsCls.getDataTypeValue('Number');
        Integer counter=counterResult.integerValue;
        system.debug('before counter'+counter);
        
        while(counter <= value){
            system.debug('counter'+counter);
            Account store =  new Account();
            store.name = 'Acme Inc n'+counterResult.stringValue;
            store.AccountNumber = 'A000n'+counter;
            addAccounts.add(store);
            counter=counter+1;
         }
        system.debug('after counter'+counter);
        system.debug('elements in list'+addAccounts);
       // insert addAccounts;
    }
}