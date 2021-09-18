import React, { Component } from 'react';
import axios from "axios";
import Config from "../BaseUrl/Config";
import { Link } from 'react-router-dom';
import InvalidFeedBack from "../Auth/InvalidFeedBack";

class ChangePassBody extends Component {
    error_msg = {
        fontSize: 15,
        color: 'red',
        
    }

    constructor(props) {
        super(props);
        this.onChangeOld = this.onChangeOld.bind(this);
        this.onChangeNew = this.onChangeNew.bind(this);
        this.onChangeConfirm = this.onChangeConfirm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            successalart: false,
            error_message: {},
            errorStatus: null
        };
    }

    onChangeOld(e) {
        this.setState({
            oldPassword: e.target.value
        });
    }
    onChangeNew(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    onChangeConfirm(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            conformPassword: this.state.confirmPassword,

        };

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.put(`${Config.apiUrl}/api/update-password`, obj, config)
            .then((res) => {
                console.log(res)
                this.setState({
                    successalart: true,
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                    error_message:'',
                    errorStatus:''
                },
                    () => { window.setTimeout(() => { this.setState({ successalart: false }) }, 2000) })

            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 409) {
                        this.setState({
                            errorStatus: 'Password not match !!'
                        })
                    }
                    else if (error.response.status === 422) {
                        this.setState({
                            error_message: error.response.data.errors,
                        })

                    }

                }
            }
            );
    }
    render() {
        let className = ''
        if (this.state.error_message.hasOwnProperty('title')) {
            className += "is-invalid"
        }
        return (
            <React.Fragment>
                <div className="askqst_post_wrap">
                    <br />
                    <h4 >
                        <i className="fas fa-key" style={{ fontSize: "15px" }}></i> Update current password</h4>
                    <br />
                    <br />
                    {this.state.successalart &&
                        <div className="alert alert-success">
                            Successfully update your password
                                         </div>
                    }
                    <div className="container">
                        <div className="row">
                            <form>
                                <div className="col-sm-4 ">
                                    <div className="para_name">
                                        <p className="name2_desin">Old Password:
                                        <input type="password"
                                                className={"text-line " + className}
                                                onChange={this.onChangeOld}
                                                value={this.state.oldPassword}
                                            />
                                        </p>
                                        <br />
                                        {this.state.error_message.hasOwnProperty('oldPassword') && <InvalidFeedBack message={this.state.error_message.oldPassword.msg} />}
                                    </div>

                                    <br />
                                    <div className="para_name">
                                        <p className="name2_desin">New Password:
                                        <input type="password" className="text-line"
                                                onChange={this.onChangeNew}
                                                value={this.state.newPassword}
                                            />
                                        </p>
                                        <br />
                                    </div>
                                    {this.state.error_message.hasOwnProperty('newPassword') && <InvalidFeedBack message={this.state.error_message.newPassword.msg} />}
                                    <br />
                                    <div className="para_name">
                                        <p className="name2_desin">Confirm Password:
                                        <input type="password" className="text-line"
                                                onChange={this.onChangeConfirm}
                                                value={this.state.confirmPassword}

                                            />

                                        </p>
                                        <br />
                                    </div>
                                    {this.state.error_message.hasOwnProperty('conformPassword') && <InvalidFeedBack message={this.state.error_message.conformPassword.msg} />}
                                    {/* {this.state.error_message.hasOwnProperty('conformPassword') && <InvalidFeedBack  message={this.state.error_message.conformPassword.msg} />} */}
                                    <span className='error' style={this.error_msg}>{this.state.errorStatus}</span>
                                    <br/>
                                    <Link to="/question_list">
                                        <button type="submit" className="btn btn-success upload_photo_btn2 "
                                        >Back</button></Link>

                                    <button type="submit" className="btn btn-success upload_photo_btn2 "
                                        onClick={this.onSubmit}
                                    >Change Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <!-- post end  --></div> */}

            </React.Fragment>
        )
    }

}
export default ChangePassBody