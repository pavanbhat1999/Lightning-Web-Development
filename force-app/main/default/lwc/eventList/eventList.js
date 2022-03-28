//Genereal Imports
import { LightningElement } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';


// Event Specific imports
import getEventList from '@salesforce/apex/EventListFetch.getAllEvents';



export default class EventList  extends NavigationMixin(LightningElement) {
    eventList;
    eventId;
    
handleCall(){
  getEventList()
  .then(data => {
      this.eventList = data;
      console.log(this.eventList);
  });
  
}
    

navigateToNewRegistration(event) {
  console.log("Data from Lwc = "+event.target.dataset.id);
  this.eventId = event.target.dataset.id;
  const defaultValues = encodeDefaultFieldValues({
      Event__c : this.eventId,
      Event_Type__c : 'Running',
      Registered_Event__c:'100M;400M'
      
  });
  console.log(defaultValues);
this[NavigationMixin.Navigate]({
  type: 'standard__objectPage',
  attributes: {
      objectApiName: 'Event_Registered__c',
      actionName: 'new',
      
  },
  state: {
      defaultFieldValues: defaultValues
  },
});
}


}