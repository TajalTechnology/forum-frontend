import React, { Component } from 'react';
import axios from "axios";
import Config from "../BaseUrl/Config";
import InvalidFeedBack from "../Auth/InvalidFeedBack";

class NewPassword extends Component {
    constructor() {
        super()
        this.onChangeOTP = this.onChangeOTP.bind(this);
        this.onChangeConfirmPass = this.onChangeConfirmPass.bind(this);
        this.onChangeNewPass = this.onChangeNewPass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            Otp: null,
            newPass: null,
            confPass: null,
            successalart: false,
            alertSt: '',
            error_message: {}
        }
    }

    onChangeOTP(e) {
        this.setState({
            Otp: e.target.value
        });
    }
    onChangeNewPass(e) {
        this.setState({
            newPass: e.target.value
        });
    }
    onChangeConfirmPass(e) {
        this.setState({
            confPass: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            newPassword: this.state.newPass,
            conformPassword: this.state.confPass,
            forgotCode: this.state.Otp
        };
        axios.put(`${Config.apiUrl}/api/forgot-password`, obj)
            .then((res) => {
                console.log(res)
                this.setState({
                    Otp: '',
                    email: '',
                    successalart: true,
                    newPass: '',
                    confPass: '',
                    error_message: ''

                },
                () => { window.setTimeout(() => { this.setState({ successalart: false }) }, 3000) })
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        error_message: error.response.data.errors,
                    })
                    // console.log('errr',error.response.data.errors)
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
                <div class="container mt-4 wr_padding_top">
                    <div class="row">
                        {/* <!-- post start  --> */}
                        <div class="askqst_post_wrap profile_img">
                            <div class="row box_shado row_div">
                                <div class="col-sm-6 pass_div">

                                    <img src="https://efrana.github.io/Tech_blogV1.2UI/img/pass3.jpg" class="img-responsive pass_img"
                                        alt="Logo" />

                                </div>
                                <div class="col-sm-6 pass_div ">
                                    <div class="heading">
                                        <h4 ><strong>Reset Password</strong></h4>
                                    </div>
                                    {this.state.successalart &&
                                        <div className="OTP_msg" style={{ marginLeft: "35%" }}>
                                            Successfully Reset Your Password!!
                                         </div>
                                    }
                                    <form>
                                        <div class="forgot_pass" style={{ marginTop: "30px" }}>
                                            <div class="form-group">
                                                <input type="username" class="form-control fontcontrol" id="text"
                                                    placeholder="Enter OTP Code here.." name="userName"
                                                    onChange={this.onChangeOTP}
                                                    value={this.state.Otp}
                                                />
                                                {this.state.error_message.hasOwnProperty('forgotCode') && <InvalidFeedBack message={this.state.error_message.forgotCode.msg} />}
                                            </div>

                                            <div class="input-group margin-bottom-sm " style={{ marginBottom: "10px" }}>
                                                <span class="input-group-addon"><i class="fa fa-lock fa-fw"></i></span>
                                                <input class="form-control fontcontrol " type="password" placeholder="New Password"
                                                    onChange={this.onChangeNewPass}
                                                    value={this.state.newPass}
                                                />

                                            </div>
                                            {this.state.error_message.hasOwnProperty('newPassword') && <InvalidFeedBack message={this.state.error_message.newPassword.msg} />
                                            }
                                            <div class="input-group margin-bottom-sm ">
                                                <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
                                                <input class="form-control fontcontrol" type="password" placeholder="Confirm Password"
                                                    onChange={this.onChangeConfirmPass}
                                                    value={this.state.confPass}
                                                />
                                            </div>
                                            {this.state.error_message.hasOwnProperty('conformPassword') && <InvalidFeedBack message={this.state.error_message.conformPassword.msg} />
                                            }
                                            {/* <br /> */}
                                            <button type="submit" class="btn btn-success addButton btn_widh" style={{ marginTop: "10px" }} onClick={this.onSubmit}>CHANGE PASSWORD</button>
                                            {/* {this.state.alertSt} */}

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <!-- post end  --> */}
                    </div>
                </div>

            </React.Fragment>
        )
    }

}
export default NewPassword