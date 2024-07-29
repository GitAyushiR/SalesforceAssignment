public class CampingListController {
public static List<Camping_Item__c> getItems (){

        List<Camping_Item__c> CI = [select id, name,price__c,Quantity__c,Packed__c from Camping_Item__c ];

        return CI;

    }
    public static Camping_Item__c saveItem (Camping_Item__c item){

        insert item;

        return item;

    }

}