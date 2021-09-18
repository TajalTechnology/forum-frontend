import React, { Component } from 'react';
import AdminSidebar from "../Layouts/AdminSidebar";
import DashboardSide from "../Layouts/DashboardSide";
import Pagination from "../Layouts/Pagination";
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";
import hasPermission from "../Auth/Authrization";
import AdminRouteProtected from'../Auth/AdminRouteProtected';

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Groups: [],
            currentPage: 1,
            totalPage: 1,
            successalart: false,
            update: false

        };
    }

    componentDidMount() {
        this.grouplist()

    }
    componentDidUpdate() {
        if (this.state.update) {
            this.grouplist()
            this.setState({
                update: false
            })
        }
        else {
            console.log("not update")
        }
    }

    grouplist = (pageNo) => {

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/roles?page=${pageNo}`, config)
            .then(response => {
                this.setState({
                    Groups: response.data.roles,
                    currentPage: response.data.pagination.current_page,
                    totalPage: response.data.pagination.total_page,
                });
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    deleteGroup(Id) {
        const token = window.localStorage.getItem('jwt-token')

        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.delete(`${Config.apiUrl}/api/role/` + Id, config)
            .then((res) => {
                console.log(res)
                this.setState({
                    successalart: true,
                    update: true
                },
                () => {
                    window.setTimeout(() => { this.setState({ successalart: false }) }, 1500)
                })
            })
                

    }
    render() {
        let { Groups, currentPage, totalPage } = this.state;
        return (
            <React.Fragment>
                <AdminRouteProtected permissionName={'can_view_roles'}>
                <div className="container mt-4 wr_padding_top">
                    <div className="row">

                        <div className="col-md-9 col-sm-8 col-xs-12">
                            {/* <!-- post start  --> */}
                            <div class="askqst_post_wrap2">
                                <h4 className="header2"> <i class="fa fa-group" style={{ fontSize: "16px" }}></i> Groups</h4>
                                {this.state.successalart &&
                                    <div className="alert alert-success">
                                        Group Deleted successfully!!!
                                 </div>
                                }
                                <div class="text_control">
                                    {hasPermission("can_add_role") &&
                                        <Link to="/add_group">
                                            <button type="button" class="btn btn-secondary addgroup btn-sm">

                                                Add new group</button></Link>
                                    }
                                </div>

                                {/* <!-- <div class="post_article pull-left">    --> */}
                                <table id="list_customers">
                                    <tr>
                                        <th>#Group ID</th>
                                        <th>Group Name</th>
                                        <th>Actions</th>

                                    </tr>
                                    {this.state.Groups.map((group, index) => (
                                        <tr>
                                            <td>#{group.id}</td>
                                            <td>{group.name}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i
                                                        class="fa fa-gear gearicon"></i></a>
                                                    <ul class="dropdown-menu menudesign3">

                                                        {hasPermission("can_update_role") &&
                                                            <li>
                                                                <Link to={"/edit_group/" + group.id}>
                                                                    <a href="#" class="mainMenu2">
                                                                        <i class="fa fa-pencil-square-o" style={{ color: "#44ce6f" }}></i>
                                                                        <span class="logout"> Edit</span></a>
                                                                </Link>
                                                            </li>
                                                        }
                                                        <br />
                                                        {hasPermission("can_delete_role") &&

                                                            <li>
                                                                <a href="#" class="mainMenu2">
                                                                    <i class="fa fa-trash" style={{ color: "red" }}></i>
                                                                    <span class="logout" onClick={(e) => this.deleteGroup(group.id)}> Delete</span></a>
                                                            </li>
                                                        }

                                                    </ul>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </table>

                            </div>
                            {/* <!-- post end  --> */}
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <DashboardSide />
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <AdminSidebar />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 custom_align_pagination">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination custom_pagination_color">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPage={totalPage}
                                        loadData={(value) => {
                                            this.grouplist(value)
                                        }}
                                    />
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                </AdminRouteProtected>
            </React.Fragment>
        )
    }

}
export default GroupList