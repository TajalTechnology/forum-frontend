import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";
import DashboardSide from "../Layouts/DashboardSide";
import AdminSidebar from "../Layouts/AdminSidebar";
import Pagination from "../Layouts/Pagination";
import hasPermission from "../Auth/Authrization";
import AdminRouteProtected from'../Auth/AdminRouteProtected';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            totalPage: 1,
            update: false,
            successalart: false,
            unbanned:false
        };
    }

    componentDidMount() {
        this.userList()
    }
    componentDidUpdate() {
        if (this.state.update) {
            this. userList()
            this.setState({
                update: false
            })
        }
        else {
            console.log("not update")
        }
    }


    userList = (pageNo) => {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/users?page=${pageNo}`, config)
            .then(response => {
                this.setState({
                    users: response.data.users,
                    currentPage: response.data.pagination.current_page,
                    totalPage: response.data.pagination.totalPage,

                });
                console.log("pagination", response.data.pagination.totalPage)
            })
            .catch(function (error) {
                console.log(error);
            })

    }


    banUser(Id,banVal) {
        const token = window.localStorage.getItem('jwt-token')
        const obj = {
            banned: banVal,
        }
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.put(`${Config.apiUrl}/api/banned-user/` + Id, obj, config)
            .then((res) => {
                console.log(res)
                if(banVal==true){
                    this.setState({ 
                        successalart: true,    
                        update: true
                    },
                    ()=> {window.setTimeout(()=>{this.setState({successalart:false})},2000)})

                }
                else{
                    this.setState({ 
                        unbanned: true,    
                        update: true
                    },
                    ()=> {window.setTimeout(()=>{this.setState({unbanned:false})},2000)})
                }
             
            })
    }
    render() {
        let { users, currentPage, totalPage } = this.state;
        return (
            <React.Fragment>
                <AdminRouteProtected permissionName={'can_view_user'}>
                <div className="container mt-4 wr_padding_top">
                    <div className="row">
                        
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            {/* <UserListTable /> */}
                            <div class="askqst_post_wrap2">
                                <h4 class="header2"><i class="fa fa-address-book" aria-hidden="true" style={{ fontSize: "15px" }}></i> User List</h4>
                                {this.state.successalart &&
                                    <div className="alert alert-success">
                                        User banned successfully!!!
                                 </div>
                                }
                                {this.state.unbanned &&
                                    <div className="alert alert-success">
                                        Unbanned successfully!!!
                                 </div>
                                }
                                <table id="list_customers" >
                                    <tr >
                                        <th>#User ID</th>
                                        <th>Username</th>
                                        <th>E-mail</th>
                                        <th>User Status</th>
                                        <th>Action</th>
                                    </tr>
                                    {this.state.users.map((user, index) => (
                                        <tr>
                                            <td>#{user.id}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            {user.banned &&
                                            <td style={{color:"red"}}>Ban</td>
                                             }
                                            {user.banned === false &&
                                            <td style={{color:"#44ce6f"}}>Active</td>
                                              }
                                        
                                            <td>
                                                <div class="dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i
                                                        class="fa fa-gear gearicon"></i></a>
                                                    <ul class="dropdown-menu menudesign3">
                                                        {hasPermission("can_update_user") &&
                                                            <li>
                                                                <Link to={"/user_details/" + user.id} >
                                                                    <a href="#" class="mainMenu2">
                                                                        <i class="fa fa-pencil-square-o" style={{ color: "#44ce6f" }}></i>
                                                                        <span class="logout"> Edit</span></a>
                                                                </Link>
                                                            </li>
                                                        }
                                                        <br />

                                                        {hasPermission("can_banned_user") &&
                                                            <li>
                                                                {user.banned === false &&
                                                                    <a href="#" class="mainMenu2">
                                                                        <i class="fa fa-ban" style={{ color: "red" }}></i>
                                                                        <span class="logout"
                                                                            onClick={(e) => this.banUser(user.id,'true')}
                                                                        > Ban</span></a>
                                                                }

                                                                {user.banned &&
                                                                    <a href="#" class="mainMenu2">
                                                                        <i class="fa fa-check" style={{ color: "green" }}></i>
                                                                        <span class="logout"
                                                                            onClick={(e) => this.banUser(user.id ,'false')}
                                                                        > Unbanned</span></a>
                                                                }
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
                <div className="row">
                    <div className="col-md-12 custom_align_pagination">
                        <Pagination
                            currentPage={currentPage}
                            totalPage={totalPage}
                            loadData={(value) => {
                                this.userList(value)
                            }}
                        />
                    </div>
                </div>
                </AdminRouteProtected>
            </React.Fragment>
        )
    }

}
export default UserList