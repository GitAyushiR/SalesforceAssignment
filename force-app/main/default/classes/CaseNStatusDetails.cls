public class CaseNStatusDetails {
    @AuraEnabled
    public static List<Case> oppDetail(){
        List<Case> caselist = [select id, CaseNumber,status from Case ];
        return caselist;
     }

}