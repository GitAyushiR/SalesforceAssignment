@isTest
public class MyAccountClass_Test {

    @isTest static void testgetAccount() {
    
        Test.startTest();
        MyAccountClass.getAccount();
        Test.stopTest();
}
     @isTest static void testgetAccountList() {
    Test.startTest();
        MyAccountClass.getAccountList('','','');
         MyAccountClass.getAccountList('Name','Equals','Raju');
        MyAccountClass.getAccountList('Name','Contains','a');
        MyAccountClass.getAccountList('Name','Ends With','s');
        MyAccountClass.getAccountList('Name','Starts With','G');
        
        Test.stopTest();
}
}