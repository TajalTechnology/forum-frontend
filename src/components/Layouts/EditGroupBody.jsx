import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";

class EditGroupBody extends Component {
    error_msg = {
        fontSize: 13,
        color: 'red'
    }
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDefautGroup = this.onChangeDefautGroup.bind(this);

        this.state = {
            allPossiblePermissions: null,
            checkbox: new Map(),
            groupName: this.props.groupName,
            successalart: false,
            defaultCheck:false,
            errorName: '',

        };
    }

    componentDidMount() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }

        const existedPermissionMap = new Map();
        this.props.existedPermission.map(role => existedPermissionMap.set(role, true));
        this.setState({
            checkbox: existedPermissionMap,
            defaultCheck:this.props.defaultCheck
        })

        axios.get(`${Config.apiUrl}/api/permissions`, config)
            .then(response => {
                this.setState({
                    allPossiblePermission: response.data.permissions,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTitle(e) {

        if (e.target.checked === true && (this.state.checkbox.size === 0 || !this.state.checkbox.get(e.target.value))) {
            this.setState({
                checkbox: this.state.checkbox.set(e.target.value, true)
            })
            console.log("if check", this.state.checkbox)
        }
        else if (e.target.checked === false && (this.state.checkbox.size === 0 || this.state.checkbox.get(e.target.value))) {
            this.setState({
                checkbox: this.state.checkbox.set(e.target.value, false)
            })
            console.log("else check", this.state.checkbox)

        }

    }
    onChangeDefautGroup(e) {
        console.log("target68", e.target.checked)

        if (e.target.checked === true) {
            this.setState({
                defaultCheck: true
            })
        }
        else{
            this.setState({
                defaultCheck: false
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
        let updatedPermissions = [];
        for (let [key, value] of this.state.checkbox) {
            if (value) {
                updatedPermissions.push(key);
            }
        }

        const obj = {
            name: this.state.groupName,
            status: 'active',
            permission: updatedPermissions,
            defaultGroup: this.state.defaultCheck
        };

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.put(`${Config.apiUrl}/api/role/` + this.props.Id, obj, config)
            .then((res) => {
                console.log(res)
                this.setState({
                    successalart: true,
                    errorName: ''
                },
                    () => {
                        window.setTimeout(() => { this.setState({ successalart: false }) }, 2000)
                    })
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
        let { allPossiblePermission } = this.state;
        // console.log('def',this.state.defaultCheck)

        return (
            <React.Fragment>
                {/* <!-- post start  --> */}

                <div class="askqst_post_wrap">
                    <h4 class="update_group">
                        <i class="fa fa-group" style={{ fontSize: "15px" }}></i> {this.state.groupName}</h4>
                    <br />
                    <br />
                    {this.state.successalart &&
                        <div className="alert alert-success">
                            Group Updated Successfully
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

                                {this.state.allPossiblePermission && this.state.allPossiblePermission.map((permission, index) => (
                                    <div class="add_permisision">
                                        <input type="checkbox"
                                            checked={this.state.checkbox.get(Object.keys(permission)[0])}
                                            value={Object.keys(permission)[0]}
                                            name="permission[]"
                                            onChange={this.onChangeTitle}
                                        />
                                        <span className="allPossiblePermission"> {permission[Object.keys(permission)[0]]}
                                        </span><br />
                                    </div>
                                ))}
                                <br/>
                                <br/>
                                <div class="add_newpermisision font ">
                                    <input type="checkbox"
                                       checked={this.state.defaultCheck}
                                        value={this.state.defaultCheck}
                                        onChange={this.onChangeDefautGroup}
                                    />
                                    <span className="permissions"> Default Signin Group
                                                </span>

                                    <br />
                                </div>

                                <div class="buttonDiv">
                                    <Link to={"/group_list"}>
                                        <button type="button" class="btn btn-success addButton"
                                        >Back</button>
                                    </Link>
                                    <button type="button" class="btn btn-success addButton"
                                        onClick={this.onSubmit}
                                    >Update Group</button>

                                </div>
                            </form>
                        </div>
                    </div>

                </div>
                {/* <!-- post end  --> */}

            </React.Fragment >
        )
    }

}
export default EditGroupBody