import React, { Component } from 'react';
import AdminEditQuesBody from "../Layouts/AdminEditQuesBody";
import AdminSidebar from "../Layouts/AdminSidebar";
import DashboardSide from "../Layouts/DashboardSide";
import AdminRouteProtected from'../Auth/AdminRouteProtected';

class AdminEditQuestion extends Component {
    constructor(props) {
		super(props);
		
    }
    
  
    render() {
        return (
            <React.Fragment>  
                <AdminRouteProtected permissionName={'can_update_pending_question'}>
              <div className="container mt-4 wr_padding_top">
                    <div className="row">
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <AdminEditQuesBody Id={this.props.match.params.id}/>
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
export default AdminEditQuestion