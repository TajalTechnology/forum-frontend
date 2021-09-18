import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import axios from "axios";
import Config from "../BaseUrl/Config";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import InvalidFeedBack from "../Auth/InvalidFeedBack";

import { Link, Redirect, withRouter} from 'react-router-dom';

const hei_min = {
    display: 'block',
    width: '100%',
    height: '44px',
    padding: '6px 12px',
    color: '#555',
    backgroundColor: '#fff',
    border:'none !important',
    borderRadius: '4px'
}

class AskQuestionBody extends Component {
    error_msg = {
        fontSize: 13,
        color: 'chocolate'
      }

    constructor() {
        super()
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);

        this.state = {
            errors: '',
            title: '',
            body: '',
            tags: [],
            successalart:false,
            error_message :{}
        }
    }
    onEditorChange(evt) {
        this.setState({
            body: evt.editor.getData()
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeBody(changeEvent) {
        this.setState({
            body: changeEvent.target.value
        })
    }

    handleChange = (tags) => {

        this.setState({ tags })
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            error_message :{}
        })
        const obj = {
            title: this.state.title,
            body: this.state.body,
            tags: this.state.tags
        };

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.post(`${Config.apiUrl}/api/question`, obj, config)
            .then((res) => {
                console.log(res)
              
                this.setState({
                    title: '',
                    body:'',
                    tags: [],
                    successalart:true
                },
                ()=> {window.setTimeout(()=>{this.setState({successalart:false})},5000)})
              
            })
            .catch(error =>{
                if (error.response) { 
                    this.setState({
                        error_message:  error.response.data.errors ,   
                    })
                  }      
            }
            );
    }

    render() {
      
        let className = ''
        if (this.state.error_message.hasOwnProperty('title')) {
            className += "is-invalid"
        }
       
        return (
            <React.Fragment>
                {/* <!-- post start  --> */}
                <div class="askqst_post_wrap">
                    <h3 class="ask-h3" ><i class="fa fa-question-circle-o" aria-hidden="true" style={{ fontSize: "23px" }}></i> AskQuestion</h3>
                    <div class="post_article full pull-left">
                        {this.state.successalart &&
                        <div className="alert alert-success">
                            Question Submited successfully!!!
                        </div>
                        }
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input className={"form-control " + className} id="textInput" placeholder="Title here.."
                                    onChange={this.onChangeTitle}
                                    value={this.state.title}
                                />
                                <small id="emailHelp" class="form-text text-muted">
                                    Be specific and imagine you’re asking a question to another person.</small>
                            </div>
                            {this.state.error_message.hasOwnProperty('title') && <InvalidFeedBack  message={this.state.error_message.title.msg} />}


                            <div class="form-group">
                                <label for="exampleInputPassword1">Body</label>
                                <CKEditor
                                    onChange={this.onEditorChange}
                                    data={this.state.body}
                                    config={{
                                        autoParagraph: false,
                                        enterMode: 2,
                                        type: 'inline'
                                    }}
                                >
                                </CKEditor>
                                <small id="emailHelp" class="form-text text-muted">
                                    Be specific and imagine you’re asking a question to another person.</small>
                            </div>
                            {this.state.error_message.hasOwnProperty('body') && <InvalidFeedBack message={this.state.error_message.body.msg} />}
                            <div class="form-group">
                                <label for="exampleInputPassword1">Tags</label>
                                <br />
                               
                                <TagsInput  style={hei_min} type="text" placeholder="e.g. Python, Android" 
                                    aria-label="Search"
                                    value={this.state.tags}
                                    onChange={this.handleChange}
                                />
                                <small id="emailHelp" class="form-text text-muted">
                                    Add up to 5 tags to describe what your question is about.</small>
                            </div>
                            {this.state.error_message.hasOwnProperty('tags') && <InvalidFeedBack message={this.state.error_message.tags.msg} />}
                            <button type="submit" class="btn btn-success post-btn btn_secoend" onClick={this.onSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
                {/* <!-- post end  --> */}

            </React.Fragment >
        )
    }

}
export default AskQuestionBody