global class BatchAcountUpdateClass implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext BC) {
        String query = 'select Id ,Name, City from Lead ';
        system.debug(query);
        return Database.getQueryLocator(query);
    }
    /* global Database.QueryLocator start(Database.BatchableContext BC) {
        
        return Database.getQueryLocator('SELECT Id,Name FROM Account');
    }
     */
    global void execute(Database.BatchableContext BC, List<Lead> leadList) {        
        try{
        for(Lead leads : leadList)
        {   
            if( leads.City != null ){
                 system.debug(leads.City);
           	leads.City = 'New York';
                 system.debug('new city is ');
            }
        }
            update leadList;
        }
        catch(Exception e) {
            System.debug('There is en exception occured'+e);
        }
        
    }   
    global void finish(Database.BatchableContext BC) {
    
  }
}