public class OpportunityDetails {
    @auraEnabled
    public static list<opportunity> getOpportunity()
    {
        list<opportunity> opp1=[select AccountId,Amount,CloseDate,ExpectedRevenue,Name,Type from Opportunity limit 17];
    	return opp1;
    }
    

}