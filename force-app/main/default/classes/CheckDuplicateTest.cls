//Test Unit
// 1. Check the trigger for available category (100% code coverage positive egative Included)
// 2. Check trigger for event match ( 100% Code coverage all the conditions included)
// 3. Check for duplicity

@isTest
private class CheckDuplicateTest {
    @isTest static void TestForAvailableCategory(){
// Dont modify test data put it in test methods
        Test.startTest();
        //create new event
        	Event__c ev = new Event__c(Name='Test Apex event',Event_type__C='Swimming',Available_categories__C='100M');
        insert ev;
        //fetch ID of the event
	ID evid=ev.ID;
        //create new athlete 
        Athlete__c at = new Athlete__C(Name='Test Apex Athlete');
        insert at;
        // Fetch ID of athlete
	ID atid = at.ID;
        // After creating all related records now enter record which is to be tested
        Event_Registered__c e = new Event_Registered__c(Event__c=evid,Athlete__c=atid,Event_type__C='Swimming',Registered_Event__c='200m');
       //#insert e;
       database.SaveResult result = database.insert(e,false);
        Test.stopTest();
        // Get the error if present
        system.debug(result);
		System.assert(!result.isSuccess());
        System.assert(result.getErrors().size() > 0);
        //comapre received error
        System.assertEquals('Event Category MisMatch \n Please Choose available Categories ie: 100M',
                             result.getErrors()[0].getMessage()); 
    }
    
    // Test for event type match
    
    //Similer process just change field values
    @isTest static void TestForEventType(){
          Test.startTest();
        	Event__c ev = new Event__c(Name='Test Apex event',Event_type__C='Swimming',Available_categories__C='100M');
        insert ev;
	ID evid=ev.ID;
        Athlete__c at = new Athlete__C(Name='Test Apex Athlete');
        insert at;
	ID atid = at.ID;
        Event_Registered__c e = new Event_Registered__c(Event__c=evid,Athlete__c=atid,Event_type__C='Running',Registered_Event__c='100m');
       //insert e;
       database.SaveResult result = database.insert(e,false);
        Test.stopTest();
        system.debug(result);
		 System.assert(!result.isSuccess());
        System.assert(result.getErrors().size() > 0);
        System.assertEquals('Please Choose Available Event Type : Swimming',
                             result.getErrors()[0].getMessage()); 
        
    }
        @isTest static void TestForDuplicateEventregistration(){
          Test.startTest();
        	Event__c ev = new Event__c(Name='Test Apex event',Event_type__C='Swimming',Available_categories__C='100M');
        insert ev;
	ID evid=ev.ID;
        Athlete__c at = new Athlete__C(Name='Test Apex Athlete');
        insert at;
	ID atid = at.ID;
        Event_Registered__c e = new Event_Registered__c(Event__c=evid,Athlete__c=atid,Event_type__C='Swimming',Registered_Event__c='100m');
       //insert e;
       database.SaveResult result = database.insert(e,false);
            Event_Registered__c e1 = new Event_Registered__c(Event__c=evid,Athlete__c=atid,Event_type__C='Swimming',Registered_Event__c='100m');
       //insert e1;
       database.SaveResult result1 = database.insert(e1,false);
        Test.stopTest();
        system.debug(result1);
		 System.assert(!result1.isSuccess());
        System.assert(result1.getErrors().size() > 0);
        System.assertEquals('It Seems You have already Registered For The Same event',
                             result1.getErrors()[0].getMessage()); 
        
    }
}