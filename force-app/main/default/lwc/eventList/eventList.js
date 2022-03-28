//Genereal Imports
import { LightningElement, wire } from 'lwc';

import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';


// Event Specific imports
import getEventList from '@salesforce/apex/EventListFetch.getAllEvents';



export default class EventList  extends NavigationMixin(LightningElement) {
    eventList;
    eventId;
    eventType;
    eventCategory;
    

// Direct Fetch
@wire(getEventList) wiredEvents({ error, data }) {
    if (data) {
        this.eventList = data;
    } else if (error) {
        this.error = error;
    }
}

handleCall(){
  getEventList()
  .then(data => {
      this.eventList = data;
      console.log(this.eventList);
  });
  
}
    

navigateToNewRegistration(event) {
  console.log("Data from Lwc = "+event.target.dataset.id);
  console.log("Data from Lwc = "+event.target.dataset.type);
  this.eventId = event.target.dataset.id;
  this.eventType = event.target.dataset.type;
  this.eventCategory = event.target.dataset.category;
  const defaultValues = encodeDefaultFieldValues({
      Event__c : this.eventId,
      Event_Type__c : this.eventType,
      Registered_Event__c:this.eventCategory
      
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