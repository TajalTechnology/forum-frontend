import React, { Component } from 'react';
import SideBar from "../Layouts/SideBar";
import CKEditor from 'ckeditor4-react';
import axios from "axios";
import Config from "../BaseUrl/Config";
import { Link } from 'react-router-dom';


class EditAnswer extends Component {
    error_msg = {
        fontSize: 13,
        color: 'red'
      }

    constructor(props) {
        super(props);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            body: '',
            questionId: '',
            Answer: null,
            respondentId: '',
            errorBody:''
        };
    }

    componentDidMount() {
        axios.get(`${Config.apiUrl}/api/answer/` + this.props.match.params.id)
            .then(response => {
                this.setState({
                    Answer: response.data.answer.body,
                    respondentId: response.data.answer.respondentId,
                    questionId: response.data.answer.questionId

                });
                console.log("update", response.data.answer.respondentId)

            })
            .catch((error) => console.log(error));
    }


    onEditorChange(evt) {
        this.setState({
            body: evt.editor.getData()
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const token = window.localStorage.getItem('jwt-token')
        let questionId = this.state.questionId
        const obj = {
            body: this.state.body,
            questionId

        }
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }
        axios.put(`${Config.apiUrl}/api/answer/` + this.props.match.params.id, obj, config)
            .then((res) => {
                console.log(res)
                this.setState({
                    body: "",

                })
                this.props.history.push('/details/' + this.state.questionId);
            })
            .catch(error =>{
                if (error.response) {
                    console.log("err",error.response.data.errors.body.msg)
                    this.setState({
                        errorBody:error.response.data.errors.body.msg,
                       
                    })
                  }      
            }
            );
    }
    render() {
        return (
            <React.Fragment>

                <div className="container mt-4 wr_padding_top">
                    <div className="row">
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <div class="askqst_post_wrap">
                                <h3>Update Answer</h3>
                                <form onSubmit={this.onSubmit}>
                                    {this.state.Answer != null &&
                                        <CKEditor
                                            onChange={this.onEditorChange}
                                            value={this.state.Answer}
                                            data={this.state.Answer}
                                            config={{
                                                autoParagraph: false,
                                                enterMode: 2,
                                                type: 'inline'
                                            }}
                                        >
                                        </CKEditor>
                                    }
                                    <br />
                                    <div>
                            <span className='error' style={this.error_msg}>{this.state.errorBody}</span>
                            </div>
                                    <Link to={"/details/"+this.state.questionId}>

                                    <button type="submit" className="btn btn-success addButton">Back</button></Link>
                                    <button type="submit" className="btn btn-success addButton">Update Your Answer</button>
                                </form>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-4 col-xs-12">
                                <SideBar />
                            </div>

                        </div>
                    </div>
            </React.Fragment>
        )
    }

}
export default EditAnswer