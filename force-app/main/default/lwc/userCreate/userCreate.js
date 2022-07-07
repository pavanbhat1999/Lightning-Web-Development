import { LightningElement } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import QUERY__C_OBJECT from '@salesforce/schema/User'; 
import USER from '@salesforce/user/Id';
import Username from '@salesforce/schema/User.Username';
import Alias from '@salesforce/schema/User.Alias';
import LastName from '@salesforce/schema/User.Name';
import Email from '@salesforce/schema/User.Email';
import TimeZoneSidKey from '@salesforce/schema/User.TimeZoneSidKey';
import LocaleSidKey from '@salesforce/schema/User.LocaleSidKey';
import EmailEncodingKey from '@salesforce/schema/User.EmailEncodingKey';
import ProfileId from '@salesforce/schema/User.ProfileId';
import LanguageLocaleKey from '@salesforce/schema/User.LanguageLocaleKey';


import createUser from '@salesforce/apex/CreateUser.create';



export default class UserCreate extends LightningElement {

    objectApiName = QUERY__C_OBJECT;

    fields = [Alias,Username, LastName,Email,TimeZoneSidKey,LocaleSidKey,EmailEncodingKey,LanguageLocaleKey];

    Alias = '';

    handleChange(event){
        this.Alias = event.target.value;

    }
    // connectedCallback(){
    //     createUser().then(
    //         (data) => {
    //             console.log(data);
    //         });

    // }
    handleSubmit(event) {
        event.preventDefault();
        let field = event.detail.fields;
        console.log('fields  ====> ' + JSON.stringify(field ));
        field.ProfileId = '00e5j000001iwLWAAY';  //putup sys admin id
      console.log('fields  After====> ' + JSON.stringify(field ));
        this.template.querySelector('lightning-record-form').submit(field);
       // this.template.querySelector('.recordFormCalss').submit(field);
    }
    handleSuccess(event) {

        //this.connectedCallback();
        // perm_id = '0PS5j000004cSjyGAE';
        createUser({Alias:this.Alias}).then(
            (data) => {
           
           console.log(this.data);
           console.log(this.Alias)
            });

        //call imperatively 
    
        const toastEvent = new ShowToastEvent({
            title: 'Query submitted',
            message: 'Successfully created record',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }

}

