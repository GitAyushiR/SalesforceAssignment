public class BatchAccount implements Database.Batchable<sObject>{

    public database.QueryLocator start(database.BatchableContext bc){
        String query = 'Select id ,name from Account';
         return database.getQueryLocator(query);
    }
    
    public void execute (database.BatchableContext bc,List<Account> accList ){
        for(Account acc : accList){
        system.debug('acc id and name >>'+ acc.id+acc.name);
        }
    }
    
    public void finish(database.BatchableContext bc){
        
    }

}