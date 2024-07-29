public class PropertyUtility {
    public static void newListedProperties(){
        String propEmail;
        List<Property__c> newPropList = [Select Name,Days_On_Market__c,Broker__r.Email__c from Property__c where Days_On_Market__c < 31];
        for(Property__c prop : newPropList){
            propEmail = prop.name + ':'+prop.Broker__r.Email__c;
        system.debug(propEmail);
        }   
    
    }
}