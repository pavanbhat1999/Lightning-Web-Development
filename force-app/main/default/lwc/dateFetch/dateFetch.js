import { LightningElement} from 'lwc'; 
 
import getNameByLeads from '@salesforce/apex/Leadcontroller.getNameByLeads'; 
 
export default class DataFetch extends LightningElement { 
 
    leads; 
 
    errors; 
 
    nameVal = ''; 

  success ;

  notfound;
 
    handleChange(event) { 
 
        this.nameVal = event.target.value; 
 
 
    } 
 
    handleCall() { 
    console.log(getNameByLeads({Name:this.nameVal}));
        getNameByLeads({Name:this.nameVal}) 
 
        .then((data) => { 
 
           this.leads = data;
    console.log(data.length); 
        if(data.length>0){
            this.success = "true";
            this.notfound = undefined;
            console.log(this.success);
            console.log("athlete data",this.leads);
        }
        else{
            this.notfound="true";
            this.success=undefined;
        }
 
            this.errors = undefined; 
 
                    }) 
 
        .catch((error) => {         
 
 
            this.leads = undefined; 
 
            this.errors = error; 
 
 
        }); 

}

}