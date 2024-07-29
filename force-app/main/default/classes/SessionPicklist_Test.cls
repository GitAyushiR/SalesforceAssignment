public class SessionPicklist_Test {
  public static List<Candidate__c> getAllCandidateRecords() {
      List<Candidate__c> cdList =new List<Candidate__c>();
      List<String> PicklistLabel = new List<String>();
      
      Schema.DescribeFieldResult fieldResult = Candidate__c.Candidate_Class__c.getDescribe();  
 		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();  
  		for (Schema.PicklistEntry f : ple) {  
            PicklistLabel.add(f.getLabel());
  		System.debug('Label ='+ f.getLabel()+' === Value ='+ f.getValue());  
  		}
      system.debug('PicklistLabel'+PicklistLabel);
      List<Candidate__c> cd = [Select Id,Name,Candidate_Class__c from Candidate__c where Candidate_Class__c IN:PicklistLabel ];
      system.debug('cd'+cd.size());
	for(Candidate__c cdvalues : cd){
         if(cdvalues.Candidate_Class__c =='First Year')
             cdList.add(cdvalues);
          
      }
      system.debug('cdList'+cdList);
      return cdList;
    }
}