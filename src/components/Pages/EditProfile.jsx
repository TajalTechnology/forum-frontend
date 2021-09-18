import React, { Component } from 'react';
import SideBar from '../Layouts/SideBar';
import EditProfileBody from '../Layouts/EditProfileBody';
import ProfileSidebar from '../Layouts/ProfileSidebar';
import axios from "axios";
import Config from "../BaseUrl/Config";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        

        this.state = {
            profile:[],
        };
    }

    componentDidMount(){
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }

        axios.get(`${Config.apiUrl}/api/profile`, config)
        .then(response => {
            this.setState({
                profile: response.data.users,
                
            });
           
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="container mt-4 wr_padding_top">
                    <div className="row">
                    <div className="col-md-3 col-sm-4 col-xs-12">
                            <ProfileSidebar
                            sidebarprofile={this.state.profile}
                            />
                        </div>
                        <div className="col-md-6 col-sm-4 col-xs-12">
                        <EditProfileBody/>
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <SideBar/>
                        </div>
                       
                    </div>
                </div>
            
            </React.Fragment>
        )
    }

}
export default EditProfile