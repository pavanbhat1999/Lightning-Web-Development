import { LightningElement,api } from 'lwc';
import getContactList from '@salesforce/apex/ContactFetch.getContacts';
import getContacts from '@salesforce/apex/ContactFetch1.getContactByName';

export default class DetailsShowHide extends LightningElement {

    show = false;
    label = "Show Related Contacts";
    contactList;
    @api recordId;

    searchName = '';
   

        searchContact(event) { 
 
                this.searchName = event.target.value; 
         
         
            } 
  
    showHide(){

        this.show = !this.show;
        
        if(this.show == false){
            this.label = "Show Related Contacts";
        }
        if(this.show == true){
            this.label = "Hide Related COntacts";
        }
        // get data from apex
        getContactList({AccountId : this.recordId}).then(
            (data) => {
           this.contactList = data; // set data to contactList
           console.log(this.contactList);
            });

    }

 
    showContact(){
        getContacts({Name : this.searchName , AccountId : this.recordId}).then(
            (data) => {
           this.contactList = data; // set data to contactList
           console.log(this.contactList);
            });
    }
}