//Genereal Imports
import { LightningElement } from 'lwc';



// Event Specific imports
import getEventList from '@salesforce/apex/EventListFetch.getAllEvents';



export default class EventList extends LightningElement {
    eventList;

    
handleCall(){
  getEventList()
  .then(data => {
      this.eventList = data;
      console.log(this.eventList);
  });
  
}
    




}