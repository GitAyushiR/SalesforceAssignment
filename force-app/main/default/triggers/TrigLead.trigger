trigger TrigLead on Lead (before insert,before update) {

    for(lead leadvalue : trigger.new){
        if( leadvalue.leadsource == 'Web'   ){
            	leadvalue.Rating = 'Cold';
        }
        else{
            leadvalue.Rating = 'Hot';
        } 
           
    }
}