import React, { Component } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Config from "../BaseUrl/Config";
import InvalidFeedBack from "../Auth/InvalidFeedBack";

class EditProfileBody extends Component {
    error_msg = {
        fontSize: 13,
        color: 'red'
    }
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
        this.onChangeDesignation = this.onChangeDesignation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            firstName: '',
            lastName: '',
            phone: '',
            designation: '',
            successalart: false,
            error_message :{}


        };
    }

    componentDidMount() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }

        axios.get(`${Config.apiUrl}/api/profile`, config)
            .then(response => {
                this.setState({

                    firstName: response.data.users.firstName,
                    lastName: response.data.users.lastName,
                    designation: response.data.users.about,
                    phone: response.data.users.phoneNo

                });

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    onChangePhoneNo(e) {
        this.setState({
            phone: e.target.value
        });
    }
    onChangeDesignation(e) {
        this.setState({
            designation: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const obj = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNo: this.state.phone,
            about: this.state.designation
        };

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.put(`${Config.apiUrl}/api/profile`, obj, config)
            .then((res) => {
                console.log(res)
                this.setState({
                    successalart: true,
                    error_message :''
                    
                },
                ()=> {window.setTimeout(()=>{this.setState({successalart:false})},2000)})
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        error_message:  error.response.data.errors ,   
                    })
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
                <div class="askqst_post_wrap">
                    <br />
                    <h4 >
                        Edit Profile</h4>
                    <br />
                    <br />
                    <div class="container">
                        <div class="row">
                            {this.state.successalart &&
                                <div className="alert alert-success profile_alart">
                                    Profile Updated
                        </div>
                            }
                            <form>
                                <div className="col-sm-4 ">
                                    <div className="form-group">
                                        <div className="input-group margin-bottom-sm">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input className={"form-control fontcontrol " + className} type="text" placeholder="Firstname"
                                                onChange={this.onChangeFirstName}
                                                value={this.state.firstName}
                                            />
                                        </div>
                                    </div>
                                    {this.state.error_message.hasOwnProperty('firstName') && <InvalidFeedBack  message={this.state.error_message.firstName.msg} />}
                                    <br />
                                    <div className="form-group">
                                        <div className="input-group margin-bottom-sm">
                                            <span className="input-group-addon"><i className="fa fa-user "></i></span>
                                            <input className="form-control fontcontrol" type="text" placeholder="Lastname"
                                                onChange={this.onChangeLastName}
                                                value={this.state.lastName}
                                            />
                                        </div>
                                    </div>
                                    {this.state.error_message.hasOwnProperty('lastName') && <InvalidFeedBack  message={this.state.error_message.lastName.msg} />}
                                    <br />
                                    <div className="form-group">
                                        <div className="input-group margin-bottom-sm">
                                            <span className="input-group-addon"><i className="fa fa-mobile "></i></span>
                                            <input className="form-control fontcontrol" type="text" placeholder="PhoneNo"
                                                onChange={this.onChangePhoneNo}
                                                value={this.state.phone}
                                            />
                                        </div>
                                    </div>
                                    {this.state.error_message.hasOwnProperty('phoneNo') && <InvalidFeedBack  message={this.state.error_message.phoneNo.msg} />}
                                    <br />
                                    <div className="form-group">

                                        <div className="input-group margin-bottom-sm">
                                            <span className="input-group-addon"><i className="fa fa-user-circle "></i></span>
                                            <input className="form-control fontcontrol" type="text" placeholder="Designation"
                                                onChange={this.onChangeDesignation}
                                                value={this.state.designation}
                                            />
                                        </div>
                                    </div>
                                    {this.state.error_message.hasOwnProperty('about') && <InvalidFeedBack  message={this.state.error_message.about.msg} />}
                                    <Link to="/my_profile">
                                        <button type="button" className="btn btn-success upload_photo_btn2 "
                                        >Back</button>
                                    </Link>
                                    <button type="button" className="btn btn-success upload_photo_btn2 "
                                        onClick={this.onSubmit}
                                    >Update Profile</button>
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
export default EditProfileBody