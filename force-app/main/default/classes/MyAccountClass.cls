public class MyAccountClass 
{
	@auraEnabled
	public static list<account> getAccount(){
       list<account> ac =[select Name,Phone,OwnerId,AccountNumber FROM Account ];
		return ac;
    }
    
    @auraEnabled
    public static List <Account> getAccountList(String parameter,String type,String value){
   			//create list to fetch values based on conditions
    	List<Account> myaccs=new List<Account>();
    	if(type=='Equals'){
            string query1='SELECT ID,Name,Phone,OwnerId,AccountNumber FROM Account Where '+ parameter +'='+'\''+value+'\'';
    		myaccs =Database.query(query1);
        }
    
    	else if(type=='Contains'){
        	string query3='SELECT ID,Name,Phone,OwnerId,AccountNumber FROM Account Where '+ parameter +' like'+'\'%'+value+'%\'' ;
        	myaccs =Database.query(query3);
		}
        
    	else if(type=='Ends With'){
            string query4='SELECT ID,Name,Phone,OwnerId,AccountNumber FROM Account Where '+ parameter +' like '+'\'%'+value+'\'';       
			myaccs =Database.query(query4);
		}

    	else if(type=='Starts With'){
            string query5='SELECT ID,Name,Phone,OwnerId,AccountNumber FROM Account Where '+ parameter +' like '+'\''+value+'%\'';       
			myaccs =Database.query(query5);
		}
        return myaccs;
      }
}