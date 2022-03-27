
import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class OpenNewRecord extends NavigationMixin(LightningElement) {
    navigateToNewOpportunity() {
    this[NavigationMixin.Navigate]({
        type: 'custom__objectPage',
        attributes: {
            objectApiName: 'Event_Registered__c',
            actionName: 'new'
        }
    });
}
}
