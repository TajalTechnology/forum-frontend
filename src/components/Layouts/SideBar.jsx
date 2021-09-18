import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import Config from "../BaseUrl/Config";
class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recenttags:[],
            question:[]

        };
    }

    componentDidMount(){
        this.recentPost()

        axios.get(`${Config.apiUrl}/api/popular-tags`)
        .then(response => {
            this.setState({
                recenttags: response.data.tags,
            });
        
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    recentPost(){
        axios.get(`${Config.apiUrl}/api/latest-questions`)
        .then(response => {
            this.setState({
                question: response.data.question,
            });
      
        })
        .catch(function (error) {
            console.log(error);
        })

    }
    render() {
       
        return (
            <React.Fragment>
                {/* <div class="col-md-3 col-sm-4 col-xs-12"> */}
                <div className="sidebar">
                    <h3><Link to="/tags"><i className="fa fa-tags" aria-hidden="true" style={{ fontSize: "12px" }}></i> Tags</Link></h3>
                    <ul>
                    {this.state.recenttags.map((tag, index) =>
                    <Link to={"/question_list/?filter=" + tag.tag} style={{ textDecoration: "none" }} >
                        <span className="label label-default custom_bg">{tag.tag}</span>
                        </Link>
                        )}
                       
                    </ul>

                </div>
                <div className="sidebar">
                    <h3> <i className="fa fa-sticky-note-o" aria-hidden="true" style={{ fontSize: "12px" }}></i> Recent Posts</h3>
                    <ul>
                    {this.state.question.map((question, index) =>
                        <li>
                            <Link to ={"/details/" + question.id}>
                            <h4><a href="#">{question.title}</a></h4>
                            </Link>
                        </li>
                    )} 
                        
                    </ul>

                </div>
                {/* </div> */}

            </React.Fragment >
        )
    }

}
export default SideBar