import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import hasPermission from "../Auth/Authrization";
import axios from "axios";
import Config from "../BaseUrl/Config";

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserName: '',
            image: null,
            IsAuthenticated:false

        };
    }

    componentDidMount() {

        if (!window.localStorage.getItem('jwt-token')) {
            console.log("jh")
        }
        else {
            this.profilePic()
            this.decodedToken()
        }
    }
    componentDidUpdate(){
        // console.log(this.props.IsAuthenticated)
        if(this.state.IsAuthenticated!=this.props.IsAuthenticated){
            this.setState({
                IsAuthenticated:this.props.IsAuthenticated
    
            })

        }
        
    }

    profilePic() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/profile`, config)
            .then(response => {
                this.setState({
                    image: response.data.imageUrl,

                });
                console.log("profile", response.data.imageUrl)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    decodedToken() {
        const token = window.localStorage.getItem('jwt-token')
        const imagesrc_pay = window.localStorage.getItem('imagesrc_pay')
        let decoded = jwt_decode(token);
        this.setState({
            currentUserName: decoded.users.userName,

        })


    }

    render() {
        // console.log("img", this.state.image)
        return (
            <React.Fragment>
                <li>
                    <p class="profileIcon">{this.state.currentUserName}</p>
                </li>
                <li>
                    {this.state.image != null &&
                        <img class="main-img2" src={" " + this.state.image} />
                    }
                    {this.state.image === null &&
                        <img class="main-img2" src="https://efrana.github.io/Tech_blogV1.2UI/img/profile2.png" />}

                </li>
                <li>
                    <div class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i
                            class="fa fa-angle-down angleIcon"></i></a>
                        <ul class="dropdown-menu menudesign">
                            <li>
                                <div>
                                    {this.state.image != null &&
                                        <img class="main-img" src={" " + this.state.image} />
                                    }
                                    {this.state.image === null &&
                                        <img class="main-img" src="https://efrana.github.io/Tech_blogV1.2UI/img/profile2.png" />}
                                    <a class="profileIcon2">{this.state.currentUserName}</a>
                                </div>
                            </li>
                            <hr />
                            <li>
                                <a href="#" class="mainMenu" style={{ marginLeft: "-16px" }}>

                                    <i class="fas fa-sign-out-alt sideicon" aria-hidden="true" style={{ paddingRight: "5px" }}></i>
                                    <span class="logout"
                                        onClick={() => {
                                            this.props.logout()
                                        }}
                                    >Logout</span></a>
                            </li>
                            <li>
                                <Link to="/my_profile">
                                    <a href="#" style={{ marginLeft: "-16px" }}>
                                        <i class="fa fa-user sideicon" aria-hidden="true" style={{ paddingRight: "7px" }}></i>
                                        <span class="logout">My Account</span></a>
                                </Link>
                            </li>
                            {this.state.IsAuthenticated &&
                                <li>
                                    {(hasPermission("can_view_roles") || hasPermission("can_view_user") || hasPermission("can_view_pending_question")) &&
                                        <Link to="/dashboard">
                                            <a href="#" style={{ marginLeft: "-16px" }}>
                                                <i class="fa fa-tachometer-alt sideicon" aria-hidden="true" style={{ paddingRight: "7px" }}></i>
                                                <span class="logout">Dashboard</span></a>
                                        </Link>
                                    }
                                </li>


                            }
                            <li>
                                <Link to="/change_password">
                                    <a href="#" style={{ marginLeft: "-16px" }}>
                                        <i class="fas fa-key sideicon" aria-hidden="true" style={{ paddingRight: "7px" }}></i>
                                        <span class="logout">Change Password</span></a>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </li>
            </React.Fragment>
        )
    }

}
export default Dropdown