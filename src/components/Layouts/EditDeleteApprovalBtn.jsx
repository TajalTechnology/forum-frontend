import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";
import hasPermission from "../Auth/Authrization";

class EditDeleteApprovalBtn extends Component {

    constructor(props) {
        super(props);
        // this.state = {
            
        //     successalart: false,
        // };
    }

    componentDidMount() {
        console.log("id", this.props.id)
    }

    approveQuestion(Id) {
        // e.preventDefault();

        const token = window.localStorage.getItem('jwt-token')
        const obj = {
            approval: true,

        }
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        //working
        axios.put(`${Config.apiUrl}/api/question-approval/` + Id, obj, config)
            .then((res) => {
                console.log(res)
                // this.setState({
                //     successalart: true
                // })
                this.props.manageState()

            })


    }

    deleteQuestion(Id) {
        const token = window.localStorage.getItem('jwt-token')

        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        //working
        axios.delete(`${Config.apiUrl}/api/pending-question/` + Id, config)
            .then((res) => {
                console.log(res)
                this.props.deleteState()

            })

    }

    render() {
        return (
            <React.Fragment>
                <ul className="dropdown-menu menudesign2">   
                    <li>
                        <Link to={"/admin_question_details/" + this.props.id}>
                            <div>
                            <a className="mainMenu2">
                                <i className="fa fa-eye " style={{color:"black"}} aria-hidden="true"></i>
                                <span className="logout"> Details</span></a>
                                </div>
                        </Link>
                    </li>
                    { hasPermission("can_update_pending_question" ) &&
                    <li>
                    
                        <Link to={"/admin_edit_question/" + this.props.id}>
                        <div>
                            <a className="mainMenu2">
                                <i className="fa fa-pencil-square-o" aria-hidden="true" style={{color:"#44ce6f"}}></i>
                                <span className="logout"> Edit</span></a></div>
                        </Link>
    
                    </li>
                     }
                    <br />
                    { hasPermission("can_delete_pending_question" ) &&
                    <li>
                        <a href="#" className="mainMenu2">
                            <i className="fa fa-trash" style={{color:"red"}}></i>
                            <span className="logout" onClick={(e) => this.deleteQuestion(this.props.id)}> Delete</span></a>
                    </li>
                       }
                    <br />
                    { hasPermission("can_approve_pending_question" ) &&
                    <li>
                        <a href="#" className="mainMenu2" >
                            <i className="fa fa-check" style={{color:"#44ce6f"}}></i>
                            <span className="logout" onClick={(e) => this.approveQuestion(this.props.id)}> Approve</span></a>
                    </li>
                     }
                </ul>

            </React.Fragment>
        )
    }

}
export default EditDeleteApprovalBtn