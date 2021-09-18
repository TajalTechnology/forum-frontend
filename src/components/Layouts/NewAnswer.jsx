import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
import axios from "axios";
import Config from "../BaseUrl/Config";

class NewAnswer extends Component {
    error_msg = {
        fontSize: 13,
        color: 'chocolate'
    }
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);

        this.state = { 
            body: '',
            questionId:'',
            upAnswer:false,
            errors: '',
            
        };
    }


    onEditorChange(evt) {
        this.setState({
            body: evt.editor.getData()
        });
    }


    onChangeBody(changeEvent) {
        this.setState({
            body: changeEvent.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const obj = {
            body: this.state.body,
            questionId: this.props.questionId,
        };

        const token = window.localStorage.getItem('jwt-token')
        const config = {
            headers: {
                'Authorization': `${token}`
            }
        }

        if (token) {
            axios.post(`${Config.apiUrl}/api/answer`, obj, config)
                .then(response => {
                    this.setState({
                        body: '',
                       
                    })
                    this.props.manageState()
                })

                .catch(error =>{
                    if (error.response) {
                        // console.log(error.response.data.errors.body.msg);
                        this.setState({
                            errors:error.response.data.errors.body.msg
                        })
                      }      
                }
                );
        }
        else {
            console.log("error")
        }
    }

    render() {
        let {  errors } = this.state;
        return (
            <React.Fragment>
                <div style={{ marginLeft: "60px" }}>
                <label for="exampleInputPassword1">Your Answer</label>
                
                <form onSubmit={this.onSubmit}>
                    <CKEditor
                        data={this.state.body}
                        onChange={this.onEditorChange}
                        config={{
                            autoParagraph: false,
                            enterMode: 2,
                            type: 'inline'
                        }}
                    >
                    </CKEditor>
                    <br/>
                    <div>
                    <span className='error' style={this.error_msg}>{errors}</span>
                    </div>
                    <button type="submit" className="btn btn-success post-btn">Post Your Answer</button>
                </form>
                </div>
            </React.Fragment>
        )
    }

}
export default NewAnswer