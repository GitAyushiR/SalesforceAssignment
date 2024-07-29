public class Opportunitylist {
    @auraEnabled
    public static list<opportunity> getOpportunity()
    {
        list<opportunity> opp1=[select AccountId,Amount,CloseDate,ExpectedRevenue,Name,Type from Opportunity  limit 20];
    	return opp1;
    }
    

}