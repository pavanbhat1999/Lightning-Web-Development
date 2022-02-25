trigger CheckDuplicate_try2 on Event_Registered__c (before insert) {
    // Steps to check for combined duplicacy
    // Step 1 : Retrieve New Insertion Values using trigger.new
    // Step 2 : Retrieve Old Registrations
    // Step 3 : Check for duplicate entry [ Athlete + Event]
     
     
 List<Event_Registered__c> eventList = new List<Event_Registered__c>();
    // Store Current Values in a variable 
     if (Trigger.isBefore && ( Trigger.isInsert || Trigger.isUpdate )) {
         eventList = Trigger.New;
     } 
     if ( Trigger.IsAfter && Trigger.isUndelete ) {
         //eventList = Trigger.New;
     }
     System.debug(eventList);
     // Store Already Registered Events in varibale - [ using SOQl]
             List<Event_Registered__c> existingEventList = [Select Event__r.Name,Athlete__r.Name From Event_Registered__c 
                                          Where Event__c != null];
     System.debug(existingEventList);
    
     System.debug('sobj'+eventList.get(0).Athlete__c);
     for ( Event_Registered__c e:existingEventList){
        System.debug('aaaa'+e.Athlete__c);
         // Check for same athlete name and same event
         if(e.Athlete__c == eventList.get(0).Athlete__c && e.Event__c==eventList.get(0).Event__c){
             System.debug('Same Kind of Record found');
          
             for(Event_Registered__c objEventR: Trigger.new){
                 objEventR.adderror('It Seems You have already Registered For The Same event');
             }
         }
         else{
             System.debug('No Match So you can create record');
         }
     }
         //System.debug('Duplicate ');
 }