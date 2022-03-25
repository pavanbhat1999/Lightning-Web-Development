import { LightningElement, track, wire } from 'lwc';
//import user data
import USER from '@salesforce/user/Id';
import USERNAME from '@salesforce/schema/User.Name';
import { getRecord } from 'lightning/uiRecordApi';
//import the static resource
import image1 from '@salesforce/resourceUrl/img1';
import image2 from '@salesforce/resourceUrl/img2';

export default class LightningCarousel extends LightningElement {

    img1 = image1;
    img2 = image2;

    //get user details
    user = USER;
    @track error;
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
}