import React, { Component } from 'react';
import { Link , Redirect,withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history'
const queryString = require('query-string');
class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.onChangeData = this.onChangeData.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.state = {
            data: "",
            searchRedirect:false
        };
    }

    onChangeData(e) {

        this.setState({
            data: e.target.value,
            
        });
    }

    onKeyUp(event) {
        if (event.charCode === 13) {
            event.preventDefault(); 
            this.setState({
                data: "",
                searchRedirect:true
            }) 
        this.props.history.push(`/question_list/?title=${this.state.data}`)
       

        }
    }
    render() {
        return (
            <React.Fragment>
                <form className="form-inline">
                    <div className="form-group has-feedback has-search cus_height_search">
                        <span className="glyphicon glyphicon-search form-control-feedback"></span>
                        <input type="text" className="form-control custom_width" placeholder="Search" 
                         name="title"
                         value={this.state.data}
                         onChange={this.onChangeData}
                         onKeyPress={this.onKeyUp}
                        />
                         <input type="submit" style={{ display: "none" }} />
                    </div>
                </form>

            </React.Fragment>
        )
    }

}
export default withRouter(SearchBar)