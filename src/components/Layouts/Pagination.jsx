import React, { Component } from "react";
import { Link } from "react-router-dom";
class Pagination extends Component {

  render() {
    let pages = [];
    for (var i = 1; i <= this.props.totalPage; i++) {
      pages.push(i);
    }
    return (
      <ul className="pagination  justify-content-center">
        {/* { this.props.currentPage > 1 && */}
          <li className = {this.props.currentPage===1 ? "page-item disabled" : "page-item"}>
            <a className="page-link" href="#" style={{ color: "black" }}
              onClick={() => {
                this.props.loadData(this.props.currentPage - 1)
              }}
              >Previous</a>
          </li>
        {/* } */}

        {/* {pages.map((page, index) => (
              <li className = {page===this.props.currentPage ? "page-item custom_active " : "page-item"}>
                <a className="page-link" style={{ color: "black"}}
                  onClick={() => {
                    this.props.loadData(page)
                  }}>{page}
                </a>
               </li>
           
        ))} */}


        {/* { this.props.currentPage < this.props.totalPage && */}
          <li className = {this.props.currentPage===this.props.totalPage ? "page-item disabled" : "page-item"}>
          <a className="page-link" style={{ color: "black" }}
              onClick={() => {
                this.props.loadData(this.props.currentPage + 1)
              }}> Next</a>
          </li>
        {/* } */}
      </ul>
    );
  }
}
export default Pagination;