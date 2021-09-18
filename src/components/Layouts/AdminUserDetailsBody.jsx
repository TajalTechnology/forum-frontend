import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";

class AdminUserDetailsBody extends Component {

    constructor(props) {
        super(props);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.state = {
            userDetail: [],
            Groups: [],
            checkbox: [],
            banned: false,
            userRoles: [],
            successalart: false,
        };
    }

    componentDidMount() {
        this.userDetails()
        this.groupList()
    }

    onChangeGroup(e) {
        const currentValue = parseInt(e.target.value)
        if (e.target.checked === true && (this.state.checkbox.size === 0 || !this.state.checkbox.get(currentValue))) {
            this.setState({
                checkbox: this.state.checkbox.set(currentValue, true)
            })
            console.log("if check", this.state.checkbox)
        }
        else if (e.target.checked === false && (this.state.checkbox.size === 0 || this.state.checkbox.get(currentValue))) {
            this.setState({
                checkbox: this.state.checkbox.set(currentValue, false)
            })
            console.log("else check", this.state.checkbox)

        }
    }


    userDetails() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/user/` + this.props.Id, config)
            .then(response => {
                this.setState({
                    userDetail: response.data.users,
                    banned: response.data.banned,
                    userRoles: response.data.Roles

                });

                const existedGroupMap = new Map();
                this.state.userRoles.map(role => existedGroupMap.set(role.id, true));
                this.setState({
                    checkbox: existedGroupMap
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    groupList() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/roles`, config)
            .then(response => {
                this.setState({
                    Groups: response.data.roles,
                });
                console.log("Groups", response.data.roles)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    assignGroup(Id) {
        const token = window.localStorage.getItem('jwt-token')
        let updatedGroup = [];
        for (let [key, value] of this.state.checkbox) {
            if (value) {
                updatedGroup.push(key);
            }
        }
        const obj = {
            roles: updatedGroup,
        }
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        //working
        axios.put(`${Config.apiUrl}/api/user-update/` + Id, obj, config)
            .then((res) => {
                console.log(res)
                this.setState({
                    successalart: true
                },
                ()=> {window.setTimeout(()=>{this.setState({successalart:false})},2000)})
                

            })
    }



    render() {

        let { userDetail } = this.state;
        return (
            <React.Fragment>
                {/* <!-- post start  --> */}
                <div class="askqst_post_wrap">
                    <br />
                    <h4 class="header2">{userDetail.userName}</h4>
                    {this.state.banned &&
                        <a class="btn btn-warning btn-sm banButton" style={{ backgroundColor: "red" }}
                        >Banned</a>
                    }
                    <br />
                    <br />
                    {this.state.successalart &&
                        <div className="alert alert-success">
                            User Add in Group !!!
                                        </div>
                    }
                    <div class="container">
                        <div class="row">
                            <form>
                                <div class="col-sm-4 ">
                                    <p><i class="fa fa-user text_design" aria-hidden="true"></i><strong>FirstName</strong></p>
                                    <div class="para_name">
                                        <p class="name_desin">{userDetail.firstName} </p>
                                        <hr />
                                    </div>
                                    <br />
                                    <p><i class="fa fa-user text_design" aria-hidden="true"></i><strong>Username</strong></p>
                                    <div class="para_name">
                                        <p class="name_desin">{userDetail.userName}</p>
                                        <hr />
                                    </div>
                                    <br />
                                    <p><i class="fa fa-mobile text_design" aria-hidden="true"></i><strong>Mobile Number</strong>
                                    </p>
                                    <div class="para_name">
                                        <p class="name_desin">{userDetail.phoneNo}</p>
                                        <hr />
                                    </div>
                                    <p><i class="fa fa-mobile text_design" aria-hidden="true"></i><strong>Groups :</strong>
                                    </p>
                                    <div class="para_name">
                                        {this.state.checkbox.length !== 0 && this.state.Groups.map((group, index) => (
                                            <div class="add_permisision">
                                                <input type="checkbox"
                                                    value={group.id}
                                                    checked={this.state.checkbox.get(group.id)}
                                                    onChange={this.onChangeGroup}
                                                />
                                                <span className="permissions"> {group.name}
                                                </span><br />
                                            </div>
                                        ))}

                                    </div>
                                    <Link to={"/user_list"}>
                                        <button type="button" class="btn btn-success upload_photo_btn2"
                                        >Back</button>
                                    </Link>
                                    <a href="#">
                                        <button type="button" class="btn btn-success upload_photo_btn2 "
                                            onClick={(e) => this.assignGroup(userDetail.id)}
                                        >Add Groups</button>
                                    </a>
                                    
                                </div>
                                <div class="col-sm-4 ">
                                    <p><i class="fa fa-user text_design" aria-hidden="true"></i><strong>LastName</strong></p>
                                    <div class="para_name">
                                        <p class="name_desin">{userDetail.lastName} </p>
                                        <hr />
                                    </div>
                                    <br />
                                    <p><i class="fa fa-envelope text_design" aria-hidden="true"></i><strong>Email</strong>
                                    </p>
                                    <div class="para_name">
                                        <p class="name_desin">{userDetail.email}</p>
                                        <hr />
                                    </div>
                                    <br />
                                    <p><i class="fa fa-mobile text_design" aria-hidden="true"></i><strong>Designaion</strong>
                                    </p>
                                    <div class="para_name">
                                        <p class="name_desin">{userDetail.about}</p>
                                        <hr />
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* // <!-- post end  --> */}

            </React.Fragment>
        )
    }

}
export default AdminUserDetailsBody