import React, { Component } from 'react';
import ShareEditDelete from "./ShareEditDelete"
import moment from 'moment';

class Answer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        moment('timestamp').format('MMMM Do YYYY')
        console.log("cr",this.props.answer.Comments)
        return (
            <div>
                <p class="answer_para">
                    {this.props.answer.body}
                </p>
                <div class="share_div">
                {this.props.currentUserId === this.props.answer.respondentId &&
                   <ShareEditDelete Id={this.props.answer.id}
                   deletUrl={"/api/answer/"}
                   manageState={() => {
                    this.props.manageState()}}
                      url={"/edit_answer/"}
                   />
                }
                    <div class="poster_div">
                  <p class="poster_para">answered <br/>{moment(this.props.answer.createdAt).format('MMMM Do,  YYYY  ')}</p>
                        {/* <img src="https://efrana.github.io/Tech_blogV1.2UI/img/profile2.png" class="img_div" /> */}
                        <p class="poster_para2">{this.props.answer.User.userName}</p>
                    </div>
                </div>
            </div>
        )
    }

}
export default Answer