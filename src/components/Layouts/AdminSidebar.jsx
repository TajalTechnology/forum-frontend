import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import hasPermission from "../Auth/Authrization";
class AdminSidebar extends Component {
    render() {
        return (
            <React.Fragment>

                <div className="sidebar">
                    <h3> <i class="fa fa-file" aria-hidden="true" style={{ fontSize: "12px" }}></i> Pages</h3>

                    {hasPermission("can_view_pending_list") &&
                        <Link to="/pending_question" className="sidebarp"><i class="fa fa-exclamation-triangle" aria-hidden="true" style={{ fontSize: "11px" }}></i>  Pending Question's
                        <br />
                            <br />
                        </Link>
                    }


                    {hasPermission("can_view_user") &&
                        <Link to="/user_list" className="sidebarp"><i class="fa fa-address-book" aria-hidden="true" style={{ fontSize: "11px" }}></i> User List
                         <br />
                            <br />
                        </Link>
                    }

                    {hasPermission("can_view_roles") &&
                        <Link to="/group_list" className="sidebarp"><i class="fa fa-group" style={{ fontSize: "11px" }}></i> Group List
                         <br />
                            <br />
                        </Link>
                    }


                    <Link to="/dashboard" className="sidebarp"><i class="fa fa-tachometer-alt" aria-hidden="true" style={{ fontSize: "11px" }}></i> Dashboard</Link>


                </div>

            </React.Fragment >
        )
    }

}
export default AdminSidebar