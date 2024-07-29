public class OppDetails_Stage {
    @auraEnabled
    public static Map<String,List<String>> ListOfOpportunity(){
        Map<String,List<String>> details = new Map<String,List<String>>();
		
		List<String> requiredStageNames = new List<String>();
        for(Opportunity_Detail__mdt oppConfig: [SELECT Id,Label FROM Opportunity_Detail__mdt]){
            requiredStageNames.add(oppConfig.Label);
        }
		List<String> subOpps;
        for(List<Opportunity> opps : [Select Id,Name,StageName 
                                      FROM Opportunity 
                                      where stageName IN:requiredStageNames
                                      Order By Name]){
                                          
         for(Opportunity opp : opps){
               subOpps = details.get(opp.StageName);
               if(subOpps == NULL){
                 subOpps = new List<String>();
                 details.put(opp.StageName, subOpps);
               }
                 subOpps.add(opp.name);
               }
             }
       system.debug('Details'+details);
       return Details;
    }
}