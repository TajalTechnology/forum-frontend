import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class MyProfileBody extends Component {

    render() {
        console.log("pro", this.props.profile)
        return (
            <React.Fragment>
                {/* <!-- post start  --> */}
                <div class="askqst_post_wrap">
                    <br />
                    <h4 >
                        Account Info</h4>

                    <br />
                    <br />
                    <div class="container">
                        <div class="row">
                            <form>
                                <div class="col-sm-4 ">
                                    <p><i class="fa fa-user text_design" aria-hidden="true"></i><strong>FirstName</strong></p>
                                    <div class="para_name">
                                        {this.props.profile.firstName &&
                                            <p class="name_desin">
                                                {this.props.profile.firstName}
                                            </p>
                                        }
                                        {!this.props.profile.firstName &&
                                            <p class="name_desin">
                                                Firstname
                                    </p>
                                        }
                                        <hr />
                                    </div>
                                    <br />
                                    <p><i class="fa fa-user text_design" aria-hidden="true"></i><strong>Username</strong></p>
                                    <div class="para_name">

                                        <p class="name_desin">
                                            {this.props.profile.userName}
                                        </p>
                                        <hr />
                                    </div>
                                    <br />
                                    <p><i class="fa fa-mobile text_design" aria-hidden="true"></i><strong>Mobile Number</strong>
                                    </p>
                                    <div class="para_name">
                                        {this.props.profile.phoneNo &&
                                            <p class="name_desin">
                                                {this.props.profile.phoneNo}
                                            </p>
                                        }
                                        {!this.props.profile.phoneNo &&
                                            <p class="name_desin">
                                                +088
                                    </p>
                                        }
                                        <hr />
                                    </div>
                                    <Link to="/edit_profile">
                                    <button type="button" className="btn btn-success upload_photo_btn2 edit_on_off"   
                                    >Edit Profile</button></Link>
                                </div>
                                <div class="col-sm-4 ">
                                    <p><i class="fa fa-user text_design" aria-hidden="true"></i><strong>LastName</strong></p>
                                    <div class="para_name">
                                        {this.props.profile.lastName &&
                                            <p class="name_desin">
                                                {this.props.profile.lastName}
                                            </p>
                                        }
                                        {!this.props.profile.lastName &&
                                            <p class="name_desin">
                                                Lastname
                                    </p>
                                        }
                                        <hr />
                                    </div>
                                    <br />
                                    <p><i class="fa fa-envelope text_design" aria-hidden="true"></i><strong>Email</strong>
                                    </p>
                                    <div class="para_name">
                                        <p class="name_desin">
                                            {this.props.profile.email}
                                        </p>
                                        <hr />
                                    </div>
                                    <br />
                                    <p><i class=" fa fa-user-circle text_design" aria-hidden="true"></i><strong>Designaion</strong>
                                    </p>
                                    <div class="para_name">
                                        {this.props.profile.about &&
                                            <p class="name_desin">
                                                {this.props.profile.about}
                                            </p>
                                        }
                                        {!this.props.profile.about &&
                                            <p class="name_desin">
                                                No Designation
                                        </p>
                                        }
                                        <hr />
                                    </div>
                                    <Link to="/edit_profile ">
                                    <button type="button" className="btn btn-success upload_photo_btn2 edit_show_off"   
                                    >Edit Profile</button></Link>
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
export default MyProfileBody