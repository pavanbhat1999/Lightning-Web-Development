import { LightningElement,api ,wire,track} from 'lwc'; 
import { getRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 

import QUERY__C_OBJECT from '@salesforce/schema/Athlete__c'; 
import USER from '@salesforce/user/Id';
import USERNAME from '@salesforce/schema/User.Name';
import NAME_FIELD from '@salesforce/schema/Athlete__c.Name'; 
import ATHLETE_CATEGORY from '@salesforce/schema/Athlete__c.Athlete_Category__c';
import CLUB from '@salesforce/schema/Athlete__c.Club__c';
import EMAIL from '@salesforce/schema/Athlete__c.Email__c';
import GENDER from '@salesforce/schema/Athlete__c.Gender__c';
// import PHONE_FIELD from '@salesforce/schema/Athlete__c.Phone__c'; 

// import CLUB_FIELD from '@salesforce/schema/Athlete__c.Clubs__c'; 

// import CATEGORY_FIELD from '@salesforce/schema/Athlete__c.Athlete_Categories__c'; 

// import EMAIL_FIELD from '@salesforce/schema/Athlete__c.Email__c'; 

// import EVENT_FIELD from '@salesforce/schema/Athlete__c.Event__c'; 

// import GENDER_FIELD from '@salesforce/schema/Athlete__c.Gender__c'; 

// import ADDRESS_FIELD from '@salesforce/schema/Athlete__c.Address__c'; 

// import AGE_FIELD from '@salesforce/schema/Athlete__c.Age__c'; 

export default class firstComponent extends LightningElement { 

 

        objectApiName = QUERY__C_OBJECT; 
    //@api objectApiName
     
    
        fields = [NAME_FIELD,GENDER,ATHLETE_CATEGORY,CLUB,EMAIL]; 
    
     
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