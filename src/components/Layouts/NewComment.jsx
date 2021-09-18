import React, { Component } from 'react';
import axios from 'axios';
import Config from "../BaseUrl/Config";

class NewComment extends Component {
    error_msg = {
        fontSize: 13,
        color: 'chocolate'
    }

    constructor(props) {
        super(props);

        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            body: '',
            errors: ''

        }
    }


    componentDidMount(){

        if(this.props.editFlag === true){
            this.editComment(this.props.commentId)
        }
        else{
            console.log("false")
        }
    }

    editComment(Id) {
        axios.get(`${Config.apiUrl}/api/comment/` + Id)
            .then(response => {
                this.setState({
                    body: response.data.details.comment.body,
                    // editedId: Id,
                    // edit: true,
                    // inputeControl: true
                });
            })
            .catch((error) => console.log(error));
    }


    onChangeBody(e) {
        this.setState({
            body: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            body: this.state.body,
            commentableId: this.props.Id,
            commentableType: this.props.type
        };
        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }

        if (this.props.editFlag === false) {
            axios.post(`${Config.apiUrl}/api/comment`, obj, config)

                .then((res) => {
                    console.log(res)
                    this.setState({
                        body: ''
                    })
                    this.props.manageState()
                    this.props.visibleFalse(false)
                })
                .catch(error =>{
                    if (error.response) {
                        console.log(error.response.data.errors.body.msg);
                        this.setState({
                            errors:error.response.data.errors.body.msg
                        })
                      }      
                }
                );
        }
        else{
            axios.put(`${Config.apiUrl}/api/comment/` + this.props.commentId, obj, config)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        body: ''
                    })
                    this.props.manageState()
                    this.props.visibleFalse(false)
                })
                .catch(error =>{
                    if (error.response) {
                        console.log(error.response.data.errors.body.msg);
                        this.setState({
                            errors:error.response.data.errors.body.msg
                        })
                      }      
                }
                );
        }
      
    }
    render() {
        return (
            <div>
                <form>
                    <textarea class=" textInput form-control" id="textInput" name="story" rows="2" cols="84"
                        style={{ padding: "10px" }} placeholder="write your comment here..."
                        value={this.state.body}
                        onChange={this.onChangeBody}
                    ></textarea>
                     <div>
                    <span className='error' style={this.error_msg}>{this.state.errors}</span>
                    </div>
                    <button type="submit" class="btn-sm btn-success post-btn btn_secoend" onClick={this.onSubmit} >Add</button>
                    <br />
                </form>
            </div>
        )
    }

}
export default NewComment