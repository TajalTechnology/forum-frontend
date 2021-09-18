import React, { Component } from 'react';
import { Link, Redirect,withRouter } from 'react-router-dom';


class AskQuestionModal extends Component {

	render() {
       
		return (
			<React.Fragment>
                 {/* <!-- modal Start --> */}
     <div class="modal" tabindex="-1" role="dialog" id="designmodal">
        <div class="modal-dialog modal_width" role="document">
            <div class="modal-content ask-qu-modal">
                <div class="modal-head">
                   <a href="#"> <i class="fa fa-window-close window_close_icon"  class="close" data-dismiss="modal" aria-hidden="true"></i></a>
                    <h2> <strong>Asking a good question</strong></h2>
                </div>
                <p class="modal_p3">
                    You’re ready to ask your first programming-related question and the community is
                    here to help! To get you the best answers, we’ve provided some guidance:
                    <br />
                    <br />
                    Before you post, <span class="modal-middele">search the site </span>to make sure your question
                    hasn’t been answered.
                </p>
                <p class="bottom-design"><span class="span_num">1.</span> Summarize the problem</p>
                <p class="bottom-design"><span class="span_num">2.</span> Describe what you’ve tried</p>
                <p class="bottom-design"><span class="span_num">3.</span> When appropriate, show some code</p>
                <p class="modal_p4">You’ll find more tips in the sidebar.</p>
                <button type="button" class="btn btn-light modal2_btn">Start writting</button>
                <button type="button" class="btn btn-light modal2_btn2">Don't show this message again</button>
            </div>
        </div>
    </div>
    {/* // <!-- modal End --> */}
				

			</React.Fragment>
		)
	}

}
export default withRouter(AskQuestionModal)