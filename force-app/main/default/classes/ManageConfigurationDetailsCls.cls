//This class is used by other classes where the value is needed far a specific data type
public class ManageConfigurationDetailsCls {
    
    public static WrapperDetails getDataTypeValue(string dataType){
        WrapperDetails wrapRec;
        try{
            
            if(dataType != null){
                for(ConfigSetting__mdt metadataRecord : [Select id,DeveloperName,Label,Data_Type__c,Deprecated__c,Value__c,Version__c from ConfigSetting__mdt where Data_Type__c =:dataType and Deprecated__c = false order by Version__c desc limit 1 ]){
                    wrapRec = new WrapperDetails();
                    if(dataType == 'Date'){
                        wrapRec.dateValue = date.parse(metadataRecord.Value__c);
                    }else if (dataType == 'String'){
                        wrapRec.stringValue = metadataRecord.Value__c;
                    } else if (dataType == 'Boolean'){
                        wrapRec.booleanValue = Boolean.valueOf(metadataRecord.Value__c);
                    } else if (dataType == 'Number'){
                        wrapRec.integerValue = Integer.valueOf(metadataRecord.Value__c);
                    }
                }
                
            }  
            
        }catch(exception e){
            system.debug('Exception Encountered>>'+e);
        }
        system.debug(wrapRec);
        return wrapRec;  
    }
    
    public class WrapperDetails{
        public Boolean booleanValue;
        public Integer integerValue;
        public Date dateValue; 
        public String stringValue ; 
    }
    
}