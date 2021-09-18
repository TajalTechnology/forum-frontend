import React, { Component } from 'react';
import AdminSidebar from "../Layouts/AdminSidebar";
import Pagination from "../Layouts/Pagination";
import DashboardSide from "../Layouts/DashboardSide";
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";
import moment from 'moment';
import EditDeleteApprovalBtn from '../Layouts/EditDeleteApprovalBtn';
import AdminRouteProtected from'../Auth/AdminRouteProtected';

class PendingQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pendingQuestion: [],
            update: false,
            successalart: false,
            deletedalart: false,
            currentPage: 1,
            totalPage: 1,

        };
    }

    componentDidMount() {
        this.pendingQuestion()
    }

    componentDidUpdate() {
        if (this.state.update) {
            this.pendingQuestion()
            this.setState({
                update: false
            })
        }
        else {
            console.log("not update")
        }
    }

    pendingQuestion = (pageNo) => {

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/pending-question-list?page=${pageNo}`, config)
            .then(response => {
                this.setState({
                    pendingQuestion: response.data.questions,
                    currentPage: response.data.pagination.current_page,
                    totalPage: response.data.pagination.total_page,

                });
                console.log("pagination", response.data.questions)
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    manageState() {
        this.setState({
            update: true,
            successalart: true,
            deletedalart: false

        },
        ()=> {window.setTimeout(()=>{this.setState({successalart:false})},2000)
        })
    }
 

    deletedAlert() {
        this.setState({
            update: true,
            deletedalart: true,
            successalart: false
        },
        ()=> {window.setTimeout(()=>{this.setState({deletedalart:false})},2000)
        })

    }
    render() {
        let { pendingQuestion, currentPage, totalPage } = this.state;
        moment('timestamp').format('MMMM Do YYYY')
        console.log("length", pendingQuestion.length)

        return (
            <React.Fragment>
                <AdminRouteProtected permissionName={'can_view_pending_question'}>
                <div className="container mt-4 wr_padding_top">
                    <div className="row">


                        <div className="col-md-9 col-sm-8 col-xs-12">
                            {/* <PendinQuestionBody /> */}
                            {/* <!-- post start  --> */}
                            <div className="askqst_post_wrap2">
                                <h4 className="header2"><i class="fa fa-exclamation-triangle" aria-hidden="true" style={{ fontSize: "15px" }}>
                                </i> Pending Question's</h4>
                                {this.state.successalart &&
                                    <div className="alert alert-success">
                                        Question Approved!!!
                                     </div>
                                }
                                {this.state.deletedalart &&
                                    <div className="alert alert-success">
                                        Question Deleted!!!
                                     </div>
                                }
                                <table id="list_customers">
                                    {pendingQuestion.length != 0 &&
                                        <tr>
                                            <th>Username</th>
                                            <th>Question</th>
                                            <th>Created At</th>
                                            <th>Actions</th>
                                        </tr>
                                    }
                                    {pendingQuestion.length === 0 &&
                                        <div>
                                            <i class="fas fa-clipboard badge_icon clip_des" ></i>
                                            <p className="no_ques">No more question !!</p>
                                        </div>

                                    }

                                    {this.state.pendingQuestion.map((question, index) => (
                                        <tr>
                                            <td><span className="tdname">Efrana</span></td>

                                            <td className="thbody">{question.title}</td>

                                            <td className="thbody">{moment(question.createdAt).format('Do MMMM YYYY  ')}</td>

                                            <td>
                                                <div className="dropdown">
                                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                        <i className="fa fa-gear gearicon"></i>
                                                    </a>
                                                    <EditDeleteApprovalBtn id={question.id}
                                                        manageState={() => {
                                                            this.manageState()
                                                        }}
                                                        deleteState={() => {
                                                            this.deletedAlert()
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            {/* post end */}
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <DashboardSide />
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <AdminSidebar />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 custom_align_pagination">
                        <Pagination
                            currentPage={currentPage}
                            totalPage={totalPage}
                            loadData={(value) => {
                                this.pendingQuestion(value)
                            }}
                        />
                    </div>
                </div>
                </AdminRouteProtected>
            </React.Fragment>
        )
    }

}
export default PendingQuestion