import { LightningElement, track, wire } from 'lwc';
//import user data
import USER from '@salesforce/user/Id';
import USERNAME from '@salesforce/schema/User.Name';
import { getRecord } from 'lightning/uiRecordApi';
//import the static resource
import goku from '@salesforce/resourceUrl/haikyu';
import image2 from '@salesforce/resourceUrl/img2';
import home from '@salesforce/resourceUrl/home';

export default class LightningCarousel extends LightningElement {

    img1 = home;
    img2 = goku;
    img3 = image2;

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