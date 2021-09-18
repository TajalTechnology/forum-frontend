import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";


class DashboardSide extends Component {
    constructor(props) {
        super(props);


        this.state = {
            profile: [],
            image: null
        };
    }

    componentDidMount() {
        this.profileInfo()
        this.profilePic()

    }
    profileInfo() {
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }

        axios.get(`${Config.apiUrl}/api/profile`, config)
            .then(response => {
                this.setState({
                    profile: response.data.users,

                });

            })
            .catch(function (error) {
                console.log(error);
            })

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
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        console.log("profiledas", this.state.image)
        return (
            <React.Fragment>

                <div class="sidebar_intro">
                    <div className="intro">
                        <img class="side_main-img" src="https://efrana.github.io/Tech_blogV1.2UI/img/img4.png" />
                        <div className="side_head">
                            <h5>!Welcome Back</h5>
                            <h6 style={{ marginLeft: "14px" }}>Dashboard</h6>
                        </div>
                    </div>
                    {this.state.image != null &&
                        <img class="side_head_main-img" src={" " + this.state.image} />
                    }
                    {this.state.image === null &&
                        <img class="side_head_main-img" src="https://efrana.github.io/Tech_blogV1.2UI/img/profile2.png" />
                    }

                   
                    <p className="email_des">{this.state.profile.email}</p>
                    <p className="email_des2">{this.state.profile.userName}</p>
                </div>
            </React.Fragment>
        )
    }

}
export default DashboardSide