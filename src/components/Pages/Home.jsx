import React, { Component } from 'react';
import axios from "axios";
import Card from "../Layouts/Card";
import SideBar from "../Layouts/SideBar";
import Pagination from "../Layouts/Pagination";
import { Link, useLocation, withRouter } from "react-router-dom";
import Config from "../BaseUrl/Config";
const queryString = require('query-string');


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentPage: 1,
            totalPage: 1,
            FilterDone: true,
            paramGet:false,
            Titleparam:null
          

        };
    }


    componentDidMount() {
        this.filterData(this.state.currentPage)
     

    }

    componentDidUpdate() {

        let Qstring = queryString.parse(window.location.search)
        if (Object.values(Qstring).length > 0) {
          if (this.state.FilterDone === true) {
            this.setState({
                FilterDone: false,
              })
            this.filterData(this.state.currentPage)
           
          }
        }
        else {
          if (this.state.FilterDone === false) {
            this.filterData(this.state.currentPage)
            this.setState({
              FilterDone: true
            })
          }
        }
      }

    

    filterData = (pageNo) => {

        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get("title") ? urlParams.get("title") : "";
        const myFilter = urlParams.get("filter") ? urlParams.get("filter") : "";
        if(myParam){
            this.setState({
                paramGet:true,
                Titleparam:myParam
            })
        }
        axios
            .get(`${Config.apiUrl}/api/questions?page=${pageNo}&tag=${myFilter}&title=${myParam}`)
            .then((response) => {
                this.setState({
                    questions: response.data.questions,
                    currentPage: response.data.pagination.current_page,
                    totalPage: response.data.pagination.totalPage,
                });
            })
            .catch((error) => console.log(error));
    }

    render() {
        let { questions, currentPage, totalPage } = this.state;
        return (
            <React.Fragment>
                <div className="container mt-4 wr_padding_top">
                    <div className="row">
                        <div className="col-md-9 col-sm-8 col-xs-12">
                            {this.state.paramGet &&
                            <h4>Search for '{this.state.Titleparam}'</h4>
                            }
                            {this.state.questions.map((question, index) => (
                                <Card question={question}
                                />
                            ))}
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-12">
                            <SideBar />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-12 custom_align_pagination">

                            <Pagination
                                currentPage={currentPage}
                                totalPage={totalPage}
                                loadData={(value) => {
                                    this.filterData(value)
                                }}
                            />
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}
export default Home