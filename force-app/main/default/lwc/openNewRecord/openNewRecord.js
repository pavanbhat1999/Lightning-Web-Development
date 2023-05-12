
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class OpenNewRecord extends NavigationMixin(LightningElement) {
    navigateToNewOpportunity() {
        const defaultValues = encodeDefaultFieldValues({
            Event__c : 'a015j00000BMTOmAAP',
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
