public class LeadProcessor implements Database.Batchable<sObject> {
    public Database.QueryLocator start(Database.BatchableContext bc) {
        // collect the batches of records or objects to be passed to execute
        String query = 'Select Id ,Name ,LeadSource  from Lead';
        return database.getQueryLocator(query);
    }
    public void execute(Database.BatchableContext bc, List<Lead> records){
        // process each batch of records
        for(Lead leadrec  : records){
            leadrec.LeadSource = 'Dreamforce';
        }
        if(!records.isEmpty()){
            update records;
        }
    }
    public void finish(Database.BatchableContext bc){
        // execute any post-processing operations
    }
}