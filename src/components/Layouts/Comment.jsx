import React, { Component } from 'react';
import NewComment from "./NewComment"
import axios from 'axios';
import Config from "../BaseUrl/Config";
import jwt_decode from "jwt-decode";
import moment from 'moment';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            editComment: false,
            commentId: '',
            currentUserId: ''

        }
    }

    componentDidMount() {

        if (window.localStorage.getItem('jwt-token')) {
			this.decodedToken()
		}
    }

    delete(deleteUrl) {
        const token = window.localStorage.getItem('jwt-token')
        axios.delete(deleteUrl, {
            headers: {

                'Authorization': `${token}`
            }
        },
        )
            .then((res) => {
                console.log(res)
                this.props.manageState()
            })
    }

    decodedToken() {
        const token = window.localStorage.getItem('jwt-token')
        let decoded = jwt_decode(token);
        this.setState({
            currentUserId: decoded.users.id
        })
    }
    visibleFalse(data) {
        this.setState({
            visible: data
        })
    }

    render() {
        moment('timestamp').format('MMMM Do YYYY')
        return (
            <React.Fragment>
                <div style={{ marginLeft: "60px" }}>
                    {this.props.Comments && this.props.Comments.map((comment, index) => (
                        <div>
                            <hr />
                            <p class="comment_div">
                                {comment.body} - <sapn class="name-col">{comment.User.userName}</sapn>
                                <span class="date-col"> {moment(comment.createdAt).format('MMMM Do,  YYYY  ')}</span>
                                {this.state.currentUserId === comment.UserId &&
                                    <a href="#textInput"><span class="edit_ic"><i class="fa fa-edit" style={{ color: "lightgray", marginLeft: "4px" }}
                                        onClick={
                                            () => {
                                                this.setState({
                                                    visible: true,
                                                    editComment: true,
                                                    commentId: comment.id
                                                })
                                            }
                                        }>
                                    </i></span>
                                    </a>
                                }
                                {this.state.currentUserId === comment.UserId &&
                                    <a href="#"><span class="edit_ic" ><i class="fa fa-trash" style={{ color: "lightgray", marginLeft: "4px" }}
                                        onClick={() => this.delete(`${Config.apiUrl}/api/comment/` + comment.id)}
                                    ></i></span></a>
                                }
                            </p>
                        </div>
                    ))}
                    <hr />
                    {this.state.visible === true &&
                        <NewComment
                            editFlag={this.state.editComment}
                            Id={this.props.Id}
                            commentId={this.state.commentId}
                            type={this.props.Type}
                            manageState={() => {
                                this.props.manageState()
                            }}
                            visibleFalse={(value) => {
                                this.visibleFalse(value)
                            }}
                        />
                    }
                    {this.state.visible === false &&
                        <a href="#textInput">
                            <p class="date-col"
                                onClick={
                                    () => {
                                        this.setState({
                                            visible: true
                                        })
                                    }
                                } >
                                <i class="fa fa-comment" aria-hidden="true" style={{ color: "lightgray", marginRight: "2px" }}></i>add comment
                        </p></a>}
                </div>
            </React.Fragment>

        )
    }

}
export default Comment