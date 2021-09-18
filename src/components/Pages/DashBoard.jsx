import React, { Component } from 'react';
import AdminSidebar from "../Layouts/AdminSidebar";
import DashboardSide from "../Layouts/DashboardSide";
import axios from "axios";
import Config from "../BaseUrl/Config";

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approveQuestion: '',
            totalPendingQues: '',
            totalUser: '',
            totalBanUsers: '',
            Questions: [],
            users: [],
            weekUser: null,
            weeklyques: null,
            Tuser: null,
            nonVfuser: null
        };
    }
    componentDidMount() {
        this.totalCount()
        this.latestQuestion()
        this.latestUsers()
    }

    totalCount() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/count`, config)
            .then(response => {
                this.setState({
                    approveQuestion: response.data.approve_questions,
                    totalPendingQues: response.data.pending_questions,
                    totalUser: response.data.verified_user,
                    totalBanUsers: response.data.ban_user,

                    weekUser: response.data.weeklyUsers,
                    weeklyques: response.data.weeklyQuestions,
                    Tuser: response.data.users,
                    nonVfuser: response.data.non_verified_user

                });
                console.log('user',response.data.weeklyUsers)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    latestQuestion() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/latest-questions`, config)
            .then(response => {
                this.setState({
                    Questions: response.data.question,

                });
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    latestUsers() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/latest-user`, config)
            .then(response => {
                this.setState({
                    users: response.data.question,

                });
                console.log("pagination", response.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        
        return (
            <React.Fragment>
                <div className="container mt-4 wr_padding_top">
                    <div className="row">
                        {/* counter card start */}
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <div >
                                <ul>
                                    <div>
                                        <div class=" badge_new" style={{ backgroundColor: "#00A693" }}>
                                            <span className="badge_design">Published Questions</span>
                                            <br />
                                            <br />
                                            {this.state.approveQuestion}
                                            <div>
                                                <i class="fas fa-clipboard badge_icon" aria-hidden="true" style={{ fontSize: "25px", color: "#D0F0C0" }}></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="badge_new badge_position" style={{ backgroundColor: "#8cc751" }}>
                                        <span className="badge_design">Pending Questions</span>
                                        <br />
                                        <br />
                                        {this.state.totalPendingQues}
                                        <div>
                                            <i class="fa fa-exclamation-triangle badge_icon" aria-hidden="true" style={{ fontSize: "25px", color: "#D0F0C0" }}></i>
                                        </div>
                                    </div>
                                    <div class=" badge_new badge_position2 " style={{ backgroundColor: "#007FFF" }}>
                                        <span className="badge_design">Verified Users</span>
                                        <br />
                                        <br />
                                        {this.state.totalUser}
                                        <div>
                                            <i class="fa fa-group badge_icon" aria-hidden="true" style={{ fontSize: "25px", color: "#E1EBEE" }}></i>
                                        </div>
                                    </div>

                                    <div class=" badge_new badge_position3" style={{ backgroundColor: "#DDA0DD" }}>
                                        <span className="badge_design">Ban Users</span>
                                        <br />
                                        <br />
                                        {this.state.totalBanUsers}
                                        <div>
                                            <i class="fa fa-user badge_icon" aria-hidden="true" style={{ fontSize: "25px", color: "#F0F8FF" }}></i>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        {/* counter card end */}
                        {/* sidebar start*/}
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <DashboardSide />
                        </div>
                        {/* sidebar end */}
                        {/* latest quesion table start */}


                        <div className="col-md-9 col-sm-8 col-xs-12" style={{ marginTop: "-23px" }}>
                            <div class="askqst_post_wrap">
                                <h4>Recent Published Question's</h4>
                                {this.state.Questions.length === 0 &&
                                        <div>
                                            <i class="fas fa-clipboard badge_icon clip_des" ></i>
                                            <p className="no_ques">No more question !!</p>
                                        </div>

                                    }

                                <table id="list_customers">
                                {this.state.Questions.length != 0 &&
                                    <tr>
                                        <th># Question ID</th>
                                        <th>Question</th>
                                    </tr>
    }
                                    {this.state.Questions.map((question, index) => (
                                        <tr>
                                            <td># {question.id}</td>
                                            <td>{question.title}</td>
                                        </tr>
                                    ))}
                                </table>

                            </div>
                        </div>
                        {/* latest quesion table end */}

                        {/* sidebar start*/}
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <AdminSidebar />
                        </div>
                        {/* sidebar end*/}
                        <br />
                        {/* latest user table start*/}
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <div class="askqst_post_wrap" style={{ marginTop: "5px" }}>
                                <h4>Recent Users List</h4>
                                <table id="list_customers">
                                    <tr>
                                        <th>#User ID</th>
                                        <th>Username</th>
                                        <th>E-mail</th>


                                    </tr>
                                    {this.state.users.map((user, index) => (
                                        <tr>
                                            <td>#{user.id}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>

                                        </tr>
                                    ))}

                                </table>
                            </div>
                        </div>
                        {/* latest user table end*/}

                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <div class="askqst_post_wrap" style={{ marginTop: "5px" }}>
                                <h4>More Information</h4>
                                <table id="list_customers">
                                    <tr>
                                        <th>Information</th>
                                        <th>Count</th>

                                    </tr>
                                    <tr>
                                        <td>Total User</td>
                                        <td>
                                            {this.state.Tuser}
                                            </td>
                                    </tr>
                                    <tr>
                                        <td>Total Non Verified User</td>
                                        <td>
                                            {this.state.nonVfuser}
                                            </td>
                                    </tr>
                                    <tr>
                                        <td>Last Week Registered User</td>
                                        <td>
                                            {this.state.weekUser}
                                            </td>
                                    </tr>
                                    <tr>
                                        <td>Last Week Posted Question</td>
                                        <td>
                                            {this.state.weeklyques}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}
export default DashBoard