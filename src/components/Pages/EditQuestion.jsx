import React, { Component } from 'react';
import SideBar from "../Layouts/SideBar";
import EditQuestionBody from "../Layouts/EditQuestionBody";


class EditQuestion extends Component {
    constructor(props) {
        super(props);
        this.state= {
            upAnswer:false
        }
    }
    manageState() {
		this.props.history.push('/details/' + this.props.match.params.id);
	}
    
    render() {
        return (
            <React.Fragment>
              <div className="container mt-4 wr_padding_top">
                    <div className="row">
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            <EditQuestionBody id={this.props.match.params.id}
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
export default EditQuestion