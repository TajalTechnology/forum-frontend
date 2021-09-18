import React, { Component } from 'react';
import hasPermission from './Authrization';
import { withRouter, Redirect } from 'react-router-dom';

class AdminRouteProtected extends Component {
    
    render(){
        console.log("permission7",this.props.permissionName)
        if(hasPermission(this.props.permissionName)){
            return(
                <div>
                    {this.props.children}
                 </div>
            )
        }
        else{
            return(
                <Redirect
                to={{
                    pathname: "/access_denied",
                    state: {
                        from: this.props.location
                    }
                }}
            />
            )
           

        }
        
    }

}
export default withRouter(AdminRouteProtected)