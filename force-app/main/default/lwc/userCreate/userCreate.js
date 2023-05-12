import { LightningElement } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import QUERY__C_OBJECT from '@salesforce/schema/User'; 
import USER from '@salesforce/user/Id';
import Username from '@salesforce/schema/User.Username';
import Alias from '@salesforce/schema/User.Alias';
import LastName from '@salesforce/schema/User.Name';
import Email from '@salesforce/schema/User.Email';
import Department from '@salesforce/schema/Contact.Department';
import TimeZoneSidKey from '@salesforce/schema/User.TimeZoneSidKey';
import LocaleSidKey from '@salesforce/schema/User.LocaleSidKey';
import EmailEncodingKey from '@salesforce/schema/User.EmailEncodingKey';
import ProfileId from '@salesforce/schema/User.ProfileId';
import LanguageLocaleKey from '@salesforce/schema/User.LanguageLocaleKey';


import createUser from '@salesforce/apex/CreateUser.create';
import assignPerm from '@salesforce/apex/assignPermissionSet.assignPerm';



export default class UserCreate extends LightningElement {

    objectApiName = QUERY__C_OBJECT;

    fields = [Alias, LastName, Email, Department];

    // Alias = '';
    userName = '';
    department = '';

    // handleChange(event){
    //     this.Alias = event.target.value;

    // }
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
        field.TimeZoneSidKey = 'America/New_York';
        field.LocaleSidKey = 'en_US';
        field.EmailEncodingKey = 'UTF-8';
        field.LanguageLocaleKey = 'en_US';
        //field.FederationIdentifier = 'pvnb@novo.com';
        field.Username = field.Alias + '@novo.com';
        this.userName = field.Username;


        //TODO: process the department
        this.department = field.Department+',department2';

      console.log('fields  After====> ' + JSON.stringify(field ));
        this.template.querySelector('lightning-record-form').submit(field);
       // this.template.querySelector('.recordFormCalss').submit(field);
    }
    handleSuccess(event) {
        console.log(this.userName);  // save username for retriving userid

        assignPerm({Name : this.userName , Department : this.department}).then(
            (data) => {
                console.log(data);
            }
        );
      


        // assign permission set and public groups throgh apex









        // For direct creation throgh apex
    //     createUser({Alias:this.Alias}).then(
    //         (data) => {
           
    //        console.log(this.data);
    //        console.log(this.Alias)
    //         });

    //     //call imperatively 
    
        const toastEvent = new ShowToastEvent({
            title: 'Query submitted',
            message: 'Successfully created record',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
   

}

}