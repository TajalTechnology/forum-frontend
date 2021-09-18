import React, { Component } from 'react';
// import { getJwt } from '../helpers/jwt';
import { withRouter, Redirect } from 'react-router-dom';


class AuthenticatedComponent extends Component {

    render() {
        if(window.localStorage.getItem('jwt-token') === null){
            window.location = '//'+ window.location.host;
        }
        const jwt = () => {
            if (localStorage.getItem("jwt-token") !== null) {
               return window.localStorage.getItem('jwt-token');

            }else{
                return false;
            }
           
        };
        if (!jwt) {
            localStorage.clear();
            sessionStorage.clear();
            return <Redirect
                to={{
                    pathname: "/",
                    state: {
                        from: this.props.location
                    }
                }}
            />
        } else {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        }
    }

}

export default withRouter(AuthenticatedComponent);
