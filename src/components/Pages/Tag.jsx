import React, { Component } from 'react';
import SideBar from "../Layouts/SideBar";
import Pagination from "../Layouts/Pagination";
import axios from "axios";
import Config from "../BaseUrl/Config";
import { Link, useLocation, withRouter } from "react-router-dom";

class Tag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            currentPage: 1,
            totalPage: 1,

        };
    }


    componentDidMount() {
        this.TagList(this.state.currentPage)
    }


    TagList(pageNo) {
        axios.get(`${Config.apiUrl}/api/questions/tag-list?page=${pageNo}`)
            .then(response => {
                this.setState({
                    tags: response.data.tags,
                    currentPage: response.data.pagination.current_page,
                    totalPage: response.data.pagination.totalPage,
                });
                console.log(response.data.tags)
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        let { tags, currentPage, totalPage } = this.state
        return (
            <React.Fragment>
                <div class="container mt-4 wr_padding_top">
                    <div class="row">
                        <div class="col-md-9 col-sm-8 col-xs-12">
                            {/* <!-- post start  --> */}
                            <div class="post_wrap">
                                <h4 class="tag-h3">
                                <i class="fa fa-tags" aria-hidden="true" style={{ fontSize: "15px" }}></i>
                                    TAGS</h4>
                                <div class="post_article pull-left">
                                    <ul>
                                        {this.state.tags.map((tag, index) =>
                                            <Link to={"/question_list/?filter=" + tag.tag} style={{ textDecoration: "none" }} >
                                                <span class="label label-default custom_bg tag_bg">{tag.tag}</span>
                                                </Link>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- post end  --> */}
                        </div>
                        <div class="col-md-3 col-sm-4 col-xs-12">
                            <SideBar />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 custom_align_pagination">

                            <Pagination
                                currentPage={currentPage}
                                totalPage={totalPage}
                                loadData={(value) => {
                                    console.log(value)
                                    this.TagList(value)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}
export default Tag