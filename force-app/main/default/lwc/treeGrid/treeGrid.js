import { LightningElement, track, wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/ExampleController.fetchAccounts';

export default class Example extends LightningElement {
    //removed track
    currentSelectedRow;
    gridColumns = [{
        type: 'text',
        fieldName: 'Name',
        label: 'Name'
    },
    {
        type: 'text',
        fieldName: 'Industry',
        label: 'Industry'
    },
    {
        type: 'text',
        fieldName: 'FirstName',
        label: 'FirstName'
    },
    {
        type: 'text',
        fieldName: 'LastName',
        label: 'LastName'
    },
    {
        type: 'text',
        fieldName: 'OpptyName',
        label: 'Opportunity Name'
    },
    {
        type: 'text',
        fieldName: 'StageName',
        label: 'Opportunity Status'
    }];
    //TODO: removed track
    gridData;

    @wire(fetchAccounts)
    accountTreeData({ error, data }) {

        console.log( 'Inside wire' );
        if ( data ) {

            let tempData = JSON.parse( JSON.stringify( data ) );

            for ( let i = 0; i < tempData.length; i++ ) {
                
                let cons = tempData[ i ][ "Contacts" ];
                delete tempData[ i ][ "Contacts" ];
                let childRecords =  cons ? cons : [];
                let opps = tempData[ i ][ "Opportunities" ];
                for ( let opp in opps ) {

                    opps[ opp ].OpptyName = opps [ opp ].Name;
                    delete opps [ opp ].Name;
                    childRecords.push( opps[ opp ] );

                }

                delete tempData[ i ][ "Opportunities" ];                
                console.log( 'Child Records ' + JSON.stringify( childRecords ) );
                tempData[ i ]._children = childRecords;

            }

            console.log( 'Final Data ' + JSON.stringify( tempData ) );
            this.gridData = tempData;

        } else if ( error ) {
           
            if ( Array.isArray( error.body ) )
                console.log( 'Error is ' + error.body.map( e => e.message ).join( ', ' ) );
            else if ( typeof error.body.message === 'string' )
                console.log( 'Error is ' + error.body.message );

        }

    }

    clickToExpandAll( e ) {
    
        const grid =  this.template.querySelector( 'lightning-tree-grid' );
        grid.expandAll();
       
    }
    clickToCollapseAll( e ) {
    
        const grid =  this.template.querySelector( 'lightning-tree-grid' );
        grid.collapseAll();
       
    }
    clickToGetExpanded(e) {
        const grid = this.template.querySelector('lightning-tree-grid');
        this.currentExpanded = grid.getCurrentExpandedRows();
    }

    get currentExpandedStr() {
        return this.currentExpanded.toString();
    }

    alertCall(){
        const grid = this.template.querySelector('lightning-tree-grid');
        this.currentSelectedRow = grid.getSelectedRows();
        console.log(this.currentSelectedRow);
        //convert data to json
        let jsonData = JSON.stringify(this.currentSelectedRow);
        //alert json data
        alert(jsonData);
    }

}