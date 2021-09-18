import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import Config from "../BaseUrl/Config";
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import { Link } from 'react-router-dom';
import InvalidFeedBack from "../Auth/InvalidFeedBack";

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

class AdminEditQuesBody extends Component {
    error_msg = {
        fontSize: 13,
        color: 'chocolate'
    }

    constructor() {
        super()
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);

        this.state = {

            title: '',
            body: null,
            tags: [],
            errorTitle: '',
            errorBody: '',
            errorTag: '',
            successalart: false,
            error_message: {}
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('jwt-token')
        let decoded = jwt_decode(token);
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.get(`${Config.apiUrl}/api/pending-question/` + this.props.Id, config)
            .then(response => {
                this.setState({
                    title: response.data.question.title,
                    body: response.data.question.body,
                    tags: response.data.question.tags

                });
            })
            .catch((error) => console.log(error));

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

    onChangeTag = (tags) => {

        this.setState({ tags })
    }

    onSubmit(e) {
        e.preventDefault();

        const token = window.localStorage.getItem('jwt-token')
        const obj = {
            title: this.state.title,
            body: this.state.body,
            tags: this.state.tags
        }
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.put(`${Config.apiUrl}/api/pending-question/` + this.props.Id, obj, config)
            .then((res) => {
                console.log(res)
                this.setState({
                    title: '',
                    body: '',
                    tags: [],
                    successalart: true,
                    error_message: ''
                },
                    () => {
                        window.setTimeout(() => { this.setState({ successalart: false }) }, 2000)
                    })
            })
            .catch(error => {
                if (error.response) {
                    // console.log(error.response.data.errors.tags.msg);
                    this.setState({
                        error_message: error.response.data.errors,
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
                <div className="askqst_post_wrap">
                    <h3 className="header2" ><i className="fa fa-question-circle-o" aria-hidden="true" style={{ fontSize: "23px" }}></i> Edit Question </h3>
                    <div className="post_article full pull-left">
                        {this.state.successalart &&
                            <div className="alert alert-success">
                                Question Edit successfully!!!
                        </div>
                        }
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input className={"form-control " + className} id="textInput" placeholder="title here"
                                    onChange={this.onChangeTitle}
                                    value={this.state.title}
                                />
                                <small id="emailHelp" className="form-text text-muted">
                                    Be specific and imagine you’re asking a question to another person.</small>
                            </div>
                            {this.state.error_message.hasOwnProperty('title') && <InvalidFeedBack message={this.state.error_message.title.msg} />}

                            <div className="form-group">
                                <label for="exampleInputPassword1">Body</label>
                                {this.state.body != null &&
                                    <CKEditor
                                        onChange={this.onEditorChange}
                                        value={this.state.body}
                                        data={this.state.body}
                                        config={{
                                            autoParagraph: false,
                                            enterMode: 2,
                                            type: 'inline'
                                        }}
                                    >
                                    </CKEditor>
                                }
                                <small id="emailHelp" className="form-text text-muted">
                                    Be specific and imagine you’re asking a question to another person.</small>
                            </div>
                            {this.state.error_message.hasOwnProperty('body') && <InvalidFeedBack message={this.state.error_message.body.msg} />}

                            <div className="form-group">
                                <label for="exampleInputPassword1">Tags</label>
                                <br />
                                <TagsInput className="form-control " style={hei_min} type="text" placeholder="e.g. Python, Android"
                                    aria-label="Search"
                                    value={this.state.tags}
                                    onChange={this.onChangeTag}
                                />
                                <small id="emailHelp" className="form-text text-muted">
                                    Add up to 5 tags to describe what your question is about.</small>
                            </div>
                            {this.state.error_message.hasOwnProperty('tags') && <InvalidFeedBack message={this.state.error_message.tags.msg} />}
                            <Link to="/pending_question">
                                <button type="submit" className="btn btn-success post-btn btn_secoend" style={{ marginRight: "5px" }}>Back</button>
                            </Link>
                            <button type="submit" className="btn btn-success post-btn btn_secoend" onClick={this.onSubmit}>Edit Question</button>
                            
                        </form>
                    </div>
                </div>
                {/* <!-- post end  --> */}

            </React.Fragment >
        )
    }

}
export default AdminEditQuesBody