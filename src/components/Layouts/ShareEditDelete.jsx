import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import axios from "axios";
// import jwt_decode from "jwt-decode";
import Config from "../BaseUrl/Config";


class ShareEditDelete extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            showAlert: null,
            successAlert: null,
            upAnswer:false
           
        };
    }


    delete(deleteUrl) {

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.delete(deleteUrl, config)
    //    this.props.history.push('/question_list')
       
    }

    alertShow(deleteUrl) {
        this.setState({
            showAlert:
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this Data!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            this.delete(deleteUrl)
                            swal("Poof! Your Data has been deleted!", {
                                icon: "success",

                            })
                                .then((value) => {
                                    this.props.manageState()

                                })

                        } else {
                            swal("Your data is safe!")
                                .then((value) => {
                                    this.props.manageState()

                                })
                        }
                    })
        })
    }

    render() {
        console.log('url', this.props.url)
        return (
            <React.Fragment>
                {/* <a href="#" class="share_btn">share</a> */}
                <Link to={this.props.url + this.props.Id} class="share_btn">edit</Link>
                <a href="#" class="share_btn"
                onClick={() => this.alertShow(`${Config.apiUrl}${this.props.deletUrl}` + this.props.Id)}
                >delete</a>
            </React.Fragment>
        )
    }

}
export default ShareEditDelete