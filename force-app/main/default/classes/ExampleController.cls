public with sharing class ExampleController {

    @AuraEnabled(cacheable=true)
    public static List < Account > fetchAccounts() {

        return [ SELECT Id, Name, Industry,
               ( SELECT Id, FirstName, LastName FROM Contacts ),
               ( SELECT Id, Name, StageName FROM Opportunities ) FROM Account LIMIT 5 ];
       
    }
   
}
