import { LightningElement,api ,wire,track} from 'lwc'; 
import { getRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import QUERY__C_OBJECT from '@salesforce/schema/Event_Registered__C'; 
import USER from '@salesforce/user/Id';
import USERNAME from '@salesforce/schema/User.Name';
import AthleteName from '@salesforce/schema/Event_Registered__c.Athlete__c';
import EventName from '@salesforce/schema/Event_Registered__c.Event__c';
import Event_Type from '@salesforce/schema/Event_Registered__c.Event_Type__c';
import RegCategory from '@salesforce/schema/Event_Registered__c.Registered_Event__c';
import NAME_FIELD from '@salesforce/schema/Athlete__c.Name'; 
import ATHLETE_CATEGORY from '@salesforce/schema/Athlete__c.Athlete_Category__c';
import CLUB from '@salesforce/schema/Athlete__c.Club__c';
import EMAIL from '@salesforce/schema/Athlete__c.Email__c';
import GENDER from '@salesforce/schema/Athlete__c.Gender__c';



export default class EventRegistration extends LightningElement {



        objectApiName = QUERY__C_OBJECT; 
    //@api objectApiName
     
    
     fields = [AthleteName,EventName,Event_Type,RegCategory]; 
    
     
     @track error ;
     @track name;
     @wire(getRecord, {
        recordId: USER,
        fields: [USERNAME]
    }) wireuser({
        error,
        data
    }) 
    {
        if (error) {
           this.error = error ; 
        } else if (data) {
            this.name = data.fields.Name.value;
        }
    }
    
    
        handleSuccess(event) { 
    
     
    
            const toastEvent = new ShowToastEvent({ 
    
     
    
                title: "Query submitted", 
    
     
    
                message: "Record ID: " + event.detail.id, 
    
     
    
                variant: "success" 
    
     
    
            }); 
    
     
    
            this.dispatchEvent(toastEvent); 
    
     
    
        } 
}