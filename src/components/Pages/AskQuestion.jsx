import React, { Component } from 'react';
import SideBar from "../Layouts/SideBar";
import AskQuestionBody from "../Layouts/AskQuestionBody";
import AskQuestionModal from '../Layouts/AskQuestionModal';
import { Link, Redirect, withRouter } from 'react-router-dom';

class AskQuestion extends Component {
    constructor(props) {
		super(props);
		this.state = {
			modalState : true
		};
    }
    
    manageState() {
		this.props.history.push('/')
	}
    render() {
        return (
            <React.Fragment>
                {/* {this.state.modalState && */}
                <AskQuestionModal show={this.state.modalState}/>
                {/* } */}
              <div className="container mt-4 wr_padding_top">
                    <div className="row">
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <AskQuestionBody 
                            manageState={() => {
                                this.manageState()
                            }}
                            />
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <SideBar/>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        )
    }

}
export default AskQuestion