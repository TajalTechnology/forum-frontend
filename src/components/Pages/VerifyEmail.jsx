import React, { Component } from 'react';
import axios from "axios";
import Config from "../BaseUrl/Config";

const main = {
    height: '100vh'
}
const clr = {
color: '#62CF6F'
}

class VerifyEmail extends Component {

    componentDidMount() {
        this.EmailVerify()

    }
    EmailVerify() {
        axios.put(`${Config.apiUrl}/api/email-verify/` + this.props.match.params.id)
            .then(response => {
            })
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <React.Fragment>
                <div className="container text-center verify_page">
                    <div className="row">

                <div class="d-flex justify-content-center align-items-center" style={main}>
                <i class="fa fa-check-circle" aria-hidden="true" style={{color:" #44ce6f", fontSize:"60px"}}></i>
                    <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center" style={clr}>Email verified</h1>
                    <div class="inline-block align-middle">
                        <h2 class="font-weight-normal lead" id="desc" style={clr}>Your Email Address successfully verified </h2>
                    </div>
                </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}
export default VerifyEmail