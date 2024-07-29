@istest
public class DailyLeadProcessorTest {
    @istest
	public static void testmethod1(){
        List<Lead> leadList = new List<Lead>();
        for(Integer i=0;i<200;i++){
            leadList.add(new Lead(Company = 'Test Lead', LastName = 'Test Lead'+i));
        }
        test.startTest();
        if(leadList.size() > 0){
            insert leadList;
        }
        DailyLeadProcessor leadpro=new DailyLeadProcessor();
          String jobId = System.schedule('ScheduledApexTest','0 0 0 21 3 ? 2022',leadpro);
        test.stopTest();
    }
}