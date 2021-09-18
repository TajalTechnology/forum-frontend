import React, { Component } from 'react';
import AdminSidebar from "../Layouts/AdminSidebar";
import AdminUserDetailsBody from '../Layouts/AdminUserDetailsBody';
import DashboardSide from "../Layouts/DashboardSide";
import AdminRouteProtected from '../Auth/AdminRouteProtected';

class AdminUserDetails extends Component {
    render() {
        return (
            <React.Fragment>
                <AdminRouteProtected permissionName={'can_update_user'}>
                    <div className="container mt-4 wr_padding_top">
                        <div className="row">

                            <div className="col-md-9 col-sm-8 col-xs-12">
                                <AdminUserDetailsBody
                                    Id={this.props.match.params.id}
                                />
                            </div>
                            <div className="col-md-3 col-sm-4 col-xs-12">
                                <DashboardSide />
                            </div>
                            <div className="col-md-3 col-sm-4 col-xs-12">
                                <AdminSidebar />
                            </div>

                        </div>
                    </div>
                </AdminRouteProtected>
            </React.Fragment>
        )
    }

}
export default AdminUserDetails