import { LightningElement} from 'lwc'; 
 
import getNameByLeads from '@salesforce/apex/Leadcontroller.getNameByLeads'; 
 
export default class MyREgistrations extends LightningElement { 
 
    leads; 
 
    errors; 
 
    nameVal = ''; 
 
    handleChange(event) { 
 
        this.nameVal = event.target.value; 
 
 
    } 
 
    handleCall() { 
 console.log(getNameByLeads({Name:this.nameVal}));
        getNameByLeads({Name:this.nameVal}) 
 
        .then((data) => { 
 
           this.leads = data; 
 
            this.errors = undefined; 
 
                    }) 
 
        .catch((error) => {         
 
 
            this.leads = undefined; 
 
            this.errors = error; 
 
 
        }); 
 
}
}