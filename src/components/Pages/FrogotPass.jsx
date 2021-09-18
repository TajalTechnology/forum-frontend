import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";

class FrogotPass extends Component {
    error_msg = {
        fontSize: 15,
        color: 'red'
    }
    constructor() {
        super()
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            email: null,
            successalart: false,
            nextbtn: false,
            error_message: null

        }
    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            email: this.state.email,

        };
        axios.put(`${Config.apiUrl}/api/send-otp`, obj)
            .then((res) => {
                console.log(res)
                this.setState({
                    email: '',
                    nextbtn: true,
                    successalart: true,
                    error_message: null

                },
                () => { window.setTimeout(() => { this.setState({ successalart: false }) }, 4000) })

            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        error_message: error.response.data.message,
                    })
                    // console.log("error",error.response.data.message)
                }
            }
            );
    }
    render() {
        return (
            <React.Fragment>
                <div class="container mt-4">
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
                                        <h4><strong>Forgot Password</strong></h4>
                                    </div>
                                   
                                    <div class="forgot_pass" style={{marginTop:"60px"}}>
                                         {this.state.successalart &&
                                         <div className="OTP_msg">
                                            OTP Send on Your E-mail
                                         </div>
                                        } 
                                        <p>Enter Your mail:</p>
                                        <form>
                                            <div class="input-group margin-bottom-sm ">
                                                <span class="input-group-addon"><i class="fa fa-envelope fa-fw"></i></span>
                                                <input class="form-control fontcontrol" type="text" placeholder="Email address"
                                                    onChange={this.onChangeEmail}
                                                    value={this.state.email} />
                                            </div>
                                            <div>
                                                <span className='error' style={this.error_msg}>{this.state.error_message}</span>
                                            </div>
                                            <br />

                                            <button type="submit" class="btn btn-success addButton btn_widh" onClick={this.onSubmit} >CHANGE PASSWORD</button>
                                        </form>
                                        {this.state.nextbtn &&
                                            <Link to="/update_new_password">
                                                <a href="#" class=" btn btn-success addButton btn_widh" >Next</a>
                                            </Link>
                                        }

                                    </div>
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
export default FrogotPass