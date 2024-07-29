public class DailyLeadProcessor implements Schedulable {
public void execute(SchedulableContext ctx) {
        List<Lead> leadUpdate = new List<Lead>();
    for(Lead leadrec:[SELECT Id, Name, OwnerId,LeadSource FROM Lead WHERE LeadSource = null LIMIT 200]){
        leadrec.LeadSource = 'Dreamforce';
        leadUpdate.add(leadrec);
    }
    if(leadUpdate.size() > 0){
      update leadUpdate;  
    }
    }
}