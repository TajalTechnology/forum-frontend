import React, { Component } from 'react';
import AdminSidebar from "../Layouts/AdminSidebar";
import EditGroupBody from '../Layouts/EditGroupBody';
import axios from "axios";
import Config from "../BaseUrl/Config";
import DashboardSide from "../Layouts/DashboardSide";
import AdminRouteProtected from'../Auth/AdminRouteProtected';

class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            groupId:'',
            existedPermission:[],
            defaultCheck:false 

        };
    }

    componentDidMount(){
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/role/` +this.props.match.params.id, config)
            .then(response => {
                this.setState({
                    group: response.data.role.name,
                    groupId:response.data.role.id,
                    existedPermission:response.data.role.permission,
                    defaultCheck:response.data.role.defaultGroup

                });
                console.log("group",response.data.role.name)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <React.Fragment>
                <AdminRouteProtected permissionName={'can_update_role'}>
                <div className="container mt-4 wr_padding_top">
                    <div className="row">
                   
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            {this.state.groupId && <EditGroupBody
                            groupName={this.state.group}
                            existedPermission={this.state.existedPermission}
                            Id={this.state.groupId}
                            defaultCheck={this.state.defaultCheck}
                            />}
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                        <DashboardSide />
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <AdminSidebar/>
                        </div>
                    </div>
                </div>
                </AdminRouteProtected>
            </React.Fragment>
        )
    }

}
export default EditGroup