public class NewClass {
 @AuraEnabled
    Public static Map<string, List<string>> getDetailsOfOpp(){ 
        Map<String, List<string>> mapOfOpp = new Map<String, List<string>>();
        List<string> stagenameDetails = new List<String>();
        List<String> listOfOppNames;
        
        OpportunityDetails__c.getall().values();
        for( OpportunityDetails__c listOfCustSetting : OpportunityDetails__c.getall().values()){
            stagenameDetails.add(listOfCustSetting.Name);
        }
		system.debug('stagenameDetails'+stagenameDetails);
        for(List<Opportunity> oppList : [Select Id,Name,StageName FROM Opportunity where stageName IN:stagenameDetails Order By Name]){
            for(Opportunity oppListDetails :oppList){
            listOfOppNames = mapOfOpp.get(oppListDetails.StageName);                                
          if(listOfOppNames == NULL){
              listOfOppNames = New List<String>();
             mapOfOpp.put(oppListDetails.StageName,listOfOppNames);
            }
                listOfOppNames.add(oppListDetails.name);
       }
    }
        system.debug('mapOfOpp'+mapOfOpp);
      return mapOfOpp;
    }
   
}