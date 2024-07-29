global class BuildPicklistOfUsers {

    @AuraEnabled 
    global static User[] getUserList() {
        return [SELECT id, Name FROM User];
    }
    @AuraEnabled
    global static User getSelectedUser(String sname) {
        return [SELECT id, Name FROM User where Id=:sname];
    }
}