public class AddPrimaryContact implements Queueable {
    private Contact contacts;
    private String stateabb;
    public AddPrimaryContact(Contact records, String state) {
        this.contacts = records;
        this.stateabb = state;
    }
    public void execute(QueueableContext context) {
        List<Contact> conList = new List<Contact>();
        for (Account account : [Select Id,name,BillingState from Account where BillingState =: stateabb LIMIT 200]) {
          {
                 Contact cont = contacts.clone(false,false,false,false);
                 cont.AccountId =  account.id;
                 conList.add( cont );
         }
         }
         if(conList.size() >0 )
         {
             insert conList;
         }
    }
}