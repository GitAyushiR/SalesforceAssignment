public class csvImportExport {

    @AuraEnabled
    public static List<String> getCustomSettingData(){
        List<String> customSettingLabel = new List<String>();
       /* Map<String, Schema.SObjectField> custFieldDetails = Custom_Data__c.sObjectType.getDescribe().fields.getMap();// Field Name
        System.debug('@@@ '+custFieldDetails);
        for (String fieldName: custFieldDetails.keySet()) {
            System.debug(custFieldDetails.get(fieldName).getDescribe().getLabel());
            if(fieldName=='Name'||fieldName.contains('__c')){
                System.debug('##Field API Name='+fieldName);// list of all field API name
                customSettingLabel.add(custFieldDetails.get(fieldName).getDescribe().getLabel());   
            }
        }*/
        	List<FieldCheck__c> fieldLabel = FieldCheck__c.getall().values();
        for(FieldCheck__c label : fieldLabel){
            customSettingLabel.add(label.Name);
        }
        system.debug('customSettingLabel'+customSettingLabel);
        return customSettingLabel;
    }
    
    @AuraEnabled
    public static List<String> saveData(String records){
        List<Account> listOfAccounts=new List<Account>();
        List<String> accountNameList= new List<String>();
        Set<String> ListofNames = new Set<String>();
        List<Object> data=(List<Object>)JSON.deserializeUntyped(records);
        System.debug(data);
        
        for(Account accName: [SELECT Name, Phone, AccountNumber From Account]){
          ListofNames.add(accName.Name);
            
        }
        system.debug('ListofNames'+ListofNames);
        for(Object obj:data){
            System.debug(obj);
            if(obj!=null){
            List<Object> recordDetails=(List<Object>)JSON.deserializeUntyped(JSON.serialize(obj));
            system.debug('recordDetails'+recordDetails);
            Account act=new Account();
            if(recordDetails[0]!=''){
                if(ListofNames.contains((String)recordDetails[0])){
               system.debug('Record already exsists');
            }
                else{
                    System.debug((String)recordDetails[0]);
                System.debug((String)recordDetails[1]);
                System.debug((String)recordDetails[2]);
                act.Name=(String)recordDetails[0];
                act.Phone=(String)recordDetails[1];
                act.AccountNumber=(String)recordDetails[2];
                listOfAccounts.add(act);
                accountNameList.add(act.Name);
                }
            }
                else{
                    system.debug('recordDetails is null');
                }
            }
        }
        insert listOfAccounts;
         System.debug(listOfAccounts.size());
        system.debug('accountNameList'+accountNameList);
        return accountNameList;
       
    }

    @AuraEnabled
    public static list <Account> fetchAccount(List<String> ListofAccName){     
        
        List <Account> AccList = new List < Account > ();        
        for(Account acc: [SELECT Name, Phone, AccountNumber From Account where Name IN: ListofAccName]) {
            
            AccList.add(acc);
        }
        system.debug('AccList'+AccList);
        return AccList;
    } 

}