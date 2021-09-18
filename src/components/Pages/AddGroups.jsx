import React, { Component } from 'react';
import AdminSidebar from "../Layouts/AdminSidebar";
import DashboardSide from "../Layouts/DashboardSide";
import axios from "axios";
import Config from "../BaseUrl/Config";
import { Link } from 'react-router-dom';
import AdminRouteProtected from '../Auth/AdminRouteProtected';
class AddGroups extends Component {
    error_msg = {
        fontSize: 13,
        color: 'red'
    }
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDefautGroup = this.onChangeDefautGroup.bind(this);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            permissions: null,
            checkbox: [],
            groupName: '',
            errorName: '',
            successalart: false,
            upState: false,
            defaultCheck: false

        };
    }

    componentDidMount() {
        this.getPermission()

    }
    componentDidUpdate() {
        if (this.state.upState) {
            this.getPermission()
            this.setState({
                upState: false
            })
        }
        else {
            console.log("not update")
        }

    }

    getPermission() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/permissions`, config)
            .then(response => {
                this.setState({
                    permissions: response.data.permissions,

                });
                console.log("type of", typeof (response.data.permissions))
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeTitle(e) {
        console.log("target", e.target.checked)
        console.log("targetvalue", e.target.value)
        if (e.target.checked === true) {
            this.state.checkbox.push(e.target.value)
        }
        else {
            const i = this.state.checkbox.indexOf(e.target.value)
            this.state.checkbox.splice(i, 1)
        }
    }


    onChangeDefautGroup(e) {
        console.log("target", e.target.checked)

        if (e.target.checked === true) {
            this.setState({
                defaultCheck: true
            })
        }

    }

    onChangeGroup(e) {
        this.setState({
            groupName: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.groupName,
            status: 'active',
            permission: this.state.checkbox,
            defaultGroup: this.state.defaultCheck
        };

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.post(`${Config.apiUrl}/api/role`, obj, config)
            .then((res) => {
                console.log(res)
                this.setState({
                    checkbox: [],
                    groupName: '',
                    successalart: true,
                    upState: true
                },
                    () => {
                        window.setTimeout(() => { this.setState({ successalart: false }) }, 2000)
                    })
                this.props.history.push("/group_list")

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data.errors.name.msg);
                    this.setState({
                        errorName: error.response.data.errors.name.msg
                    })
                }
            }
            );
    }
    render() {
        return (
            <React.Fragment>
                <AdminRouteProtected permissionName={'can_add_role'}>
                    <div className="container mt-4 wr_padding_top">
                        <div className="row">

                            <div className="col-md-9 col-sm-8 col-xs-12">
                                {/* <AddGroupsBody /> */}
                                <div class="askqst_post_wrap">
                                    <h4 class="header2">Add Group</h4>
                                    <br />
                                    <br />
                                    {this.state.successalart &&
                                        <div className="alert alert-success">
                                            Group Created successfully!!!
                        </div>
                                    }
                                    <div class="text_control">
                                        <div class="Add_group">
                                            <form>
                                                <p className="font">Group Name:</p>
                                                <div class="add_permisision">
                                                    <input type="email" id="textInput" class="form-control groupform" placeholder="Enter group name.."
                                                        onChange={this.onChangeGroup}
                                                        value={this.state.groupName}
                                                    />
                                                </div>
                                                <br />
                                                <div>
                                                    <span className='error' style={this.error_msg}>{this.state.errorName}</span>
                                                </div>
                                                <p className="font">Add Permissions:</p>
                                                <br />
                                                {this.state.permissions && this.state.permissions.map((permission, index) => (
                                                    <div class="add_permisision">
                                                        <input type="checkbox"
                                                            value={Object.keys(permission)[0]}
                                                            name="permission[]"
                                                            onChange={this.onChangeTitle}
                                                        />
                                                        <span className="permissions"> {permission[Object.keys(permission)[0]]}
                                                        </span><br />
                                                    </div>
                                                ))}
                                                <br />
                                                <br />

                                                <div class="add_newpermisision font">
                                                    <input type="checkbox"
                                                        value={this.state.defaultCheck}
                                                        onChange={this.onChangeDefautGroup}
                                                    />
                                                    <span className="permissions"> Default Signin Group
                                                </span>

                                                    <br />
                                                </div>


                                                <div class="buttonDiv">
                                                    <Link to="/group_list">
                                                        <button type="button" class="btn btn-success addButton">Back </button></Link>
                                                    <button type="button" class="btn btn-success addButton" onClick={this.onSubmit}>Create Group</button>

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
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
export default AddGroups