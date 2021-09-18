import React, { Component } from 'react';
import Answer from '../Layouts/Answer';
import SideBar from "../Layouts/SideBar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Config from "../BaseUrl/Config";
import { Link, useLocation } from "react-router-dom";
import moment from 'moment';
import Comment from '../Layouts/Comment';
import ShareEditDelete from '../Layouts/ShareEditDelete';
import NewAnswer from '../Layouts/NewAnswer';


class Details extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Question: [],
			Tags: [],
			Answer: [],
			count: '',
			questionerId: '',
			currentUserId: '',
		
			upAnswer: false,
			QuestionComments: [],
			AnswerComments: [],
			upAnswer: false,
			UserName:'',
			View:''
		};
	}
	componentDidMount() {
		this.Singledetails()
		this.viewCount()
	
		if (window.localStorage.getItem('jwt-token')) {
			this.decodedToken()
		}
		
	}

	viewCount(){
		const obj = {
            userId:this.state.currentUserId
          
        };
		axios.post(`${Config.apiUrl}/api/views/` + this.props.match.params.id , obj)
		.then(response => {
			this.setState({
				View: response.data.total_count,
			});
			
		})
		.catch((error) => console.log(error));

	}

	Singledetails() {
		axios.get(`${Config.apiUrl}/api/question-answers/` + this.props.match.params.id)
			.then(response => {
				this.setState({
					Question: response.data.question_details,
					Tags: response.data.question_details.tags,
					Answer: response.data.question_details.Answers,
					count: response.data.total_answer,
					UserName: response.data.question_details.User.userName,
					questionerId: response.data.question_details.questionerId,
					QuestionComments: response.data.question_details.Comments,
					
				});
				console.log("details", response.data.question_details.Answers)
			})
			.catch((error) => console.log(error));
	}

	decodedToken() {
		const token = window.localStorage.getItem('jwt-token')
		let decoded = jwt_decode(token);
		this.setState({
			currentUserId: decoded.users.id
		})
	}

	componentDidUpdate() {
		if (this.state.upAnswer) {
			this.Singledetails()
			this.setState({
				upAnswer: false
			})
		}
		else {
			console.log("not update")
		}
	}

	manageState() {
		this.setState({
			upAnswer: true

		})
	}

	render() {
		

		let { count,  QuestionComments} = this.state;
		moment('timestamp').format('MMMM Do YYYY')
		return (
			<React.Fragment>
				<div className="container mt-4 wr_padding_top">
					<div className="row">
						<div className="col-md-9 col-sm-8 col-xs-12">
							{/* <!-- post start  --> */}
							<div className="post_wrap">
								<div className="post_view_answer pull-left">
									<div className="activity-summary">
										<b>
											{this.state.View}
							           </b>
							             view's
						             </div>
									<div className="activity-summary">
										<i className="fa fa-circle-o">
										</i>
										<div className="line-y">
										</div>
										<i className="fa fa-circle-o">
										</i>
									</div>
									<div className="activity-summary">
										<b>
											{count}
										</b>
							           answer's
						               </div>
								</div>
								<div className="post_article pull-left">

									<h3><a href="#">{this.state.Question.title}
									</a></h3>
									<div className="details">
										<ul>
											<li><span className="user_padding"><i className="fa fa-user" aria-hidden="true"></i></span>
											By {this.state.UserName}
								           </li>
											<li><i className="fa fa-clock-o" aria-hidden="true"></i> {moment(this.state.Question.createdAt).format('MMMM Do,  YYYY  ')}</li>
										</ul>
									</div>
									<div className="tags">
										{this.state.Tags.map((tag, index) => (
											<Link to={"/question_list/?filter=" + tag} key={index}>
												<span className="label label-default" style={{ margin: "2px" }}>{tag}</span>
											</Link>
										))}
									</div>
									<br />
									<div className="content">
										<p>{this.state.Question.body} </p>
									</div>
								</div>
								<div className="quest_edit">
									<div className="share_div">
										{this.state.currentUserId === this.state.questionerId &&
											<ShareEditDelete Id={this.state.Question.id} 
											url={"/edit_question/"}
											manageState={() => {
												this.manageState()
											}}
											deletUrl={"/api/question/"}
											
											/>
										}
									</div>
									<div className="answer_para2">
										<Comment
											Comments={QuestionComments}
											Id={this.state.Question.id}
											Type={"question"}
											manageState={() => {
												this.manageState()
											}}
										/>
									</div>
								</div>
								{/* <!-- answer Start --> */}
								<div className="col-lg-2 col-3">
									<h4 className="answer-head">{count} Answers</h4>
									{this.state.Answer.map((answer, index) => (
										<div>
											<Answer
												answer={answer}
												currentUserId={this.state.currentUserId}
												questionerId={this.state.questionerId}
												manageState={() => {
													this.manageState()}}
												
											/>
											<div className="answer_para2">
												<Comment
													Comments={answer.Comments}
													Id={answer.id}
													Type={"answer"}
													manageState={() => {
														this.manageState()
													}}
												/>
											</div>
										</div>
									))}
									<div className="answer_para2">
										<NewAnswer
											questionId={this.state.Question.id}
											manageState={() => {
												this.manageState()
											}} />
									</div>
								</div>
							</div>
							{/* <!-- post end  --> */}
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
export default Details