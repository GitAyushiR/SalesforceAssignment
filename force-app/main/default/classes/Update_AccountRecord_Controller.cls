public class Update_AccountRecord_Controller {
@AuraEnabled
    public static Account getAccount(Id accountId) {
        return [SELECT Name,NumberOfEmployees,Ownership,Industry,Type, BillingCity, BillingState FROM Account WHERE Id = :accountId];
    }

	@AuraEnabled
    public static void updatedValues(String accountId,String Industry,Integer Employees,String Type,String Ownership) {
        
         Account newAccountDetails = [Select Id ,Industry,NumberOfEmployees, Name From Account Where Id =:accountId];
        newAccountDetails.Industry = Industry ;
        newAccountDetails.NumberOfEmployees = Employees ; 
        newAccountDetails.Type = Type;
        newAccountDetails.Ownership = Ownership;
     
        update newAccountDetails;
    }
	/* @AuraEnabled
    public static Map<String,List<String>> getPicklistValuesByCustSetting() {
        Map<String,List<String>> mapOfPicklistValues =new Map<String,List<String>>();
        List<String> custValues = new List<String>();
        List<String> listOfPicklistValues;
        for(Update_Record__c listOfValues :Update_Record__c.getAll().values()){
           listOfPicklistValues = new List<String>();
            if(listOfValues.Name =='Type'){
                listOfPicklistValues.add(Account.Industry.getDescribe().getpicklistValues());
                mapOfPicklistValues.put(listOfValues.Name,listOfPicklistValues);
            }
           
        }
        system.debug(custValues);
       /* for(String details:custValues){
            listOfPicklistValues = new List<String>();
         
            for(Schema.PicklistEntry i:Account.details.getDescribe().getpicklistValues()){
            listOfPicklistValues.add(i.getLabel());
            mapOfPicklistValues.put(details,listOfPicklistValues);
            system.debug(details);
            }
        }
        
        return mapOfPicklistValues;
    }*/
    
    @AuraEnabled
    public static Map<String,List<String>> getPicklistValues() {
        //Schema.DescribeFieldResult industryResult = Account.Industry.getDescribe();
        //  List<Schema.PicklistEntry> industry_picklist = industryResult.getpicklistValues();
        List<String> Industry_values =new List<String>();
        List<String> Type_values =new List<String>();
        List<String> Ownership_values =new List<String>();
        Map<String,List<String>> mapOfPicklistValues =new Map<String,List<String>>();
        system.debug(Account.Industry.getDescribe().getpicklistValues());
		for(Schema.PicklistEntry i : Account.Industry.getDescribe().getpicklistValues()){
          Industry_values.add(i.getLabel());
        }
        for(Schema.PicklistEntry j : Account.Type.getDescribe().getpicklistValues()){
          Type_values.add(j.getLabel());
        }for(Schema.PicklistEntry k : Account.Ownership.getDescribe().getpicklistValues()){
          Ownership_values.add(k.getLabel());
        }
        
        mapOfPicklistValues.put('Industry',Industry_values);
      	mapOfPicklistValues.put('Type',Type_values);
        mapOfPicklistValues.put('Ownership',Ownership_values);
        system.debug('mapOfPicklistValues>>>>>>>>>>>'+mapOfPicklistValues);
        return mapOfPicklistValues;
    }
}