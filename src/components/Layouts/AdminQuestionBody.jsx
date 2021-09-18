import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';
import Config from "../BaseUrl/Config"
class AdminQuestionBody extends Component {
	constructor() {
		super()
		this.state = {

			Question: '',
			user:'',
			Tags: []

		}
	}

	componentDidMount() {
		const token = window.localStorage.getItem('jwt-token')

		const config = {
			headers: {
				'Authorization': `${token}`
			}
		}
		axios.get(`${Config.apiUrl}/api/pending-question/` + this.props.Id, config)
			.then(response => {
				this.setState({
					Question: response.data.question,
					Tags: response.data.question.tags,
					user:response.data.question.User


				});

				console.log("qu", response.data.question.User)

			})
			.catch((error) => console.log(error));

	}
	render() {
		let { Question,user } = this.state;
		console.log("helo", this.state.Tags)
		moment('timestamp').format('MMMM Do YYYY')
		return (
			<React.Fragment>
				{/* <!-- post start  --> */}
				<div class="post_wrap">
					<div class="post_view_answer pull-left">
						<div class="activity-summary">
							<b>
							{Question.viewCount}
							</b>
							view's
						</div>
						<div class="activity-summary">
							<i class="fa fa-circle-o">
							</i>
							<div class="line-y">
							</div>
							<i class="fa fa-circle-o">
							</i>
						</div>
						<div class="activity-summary">
							<b>
								0
							</b>
							answer's
						</div>
					</div>

					<div class="post_article pull-left">

						<h3><a href="#">{Question.title}
						</a></h3>
						<div class="details">
							<ul>
								<li><span class="user_padding"><i class="fa fa-user" aria-hidden="true"></i></span>By {user.userName}
								</li>
								<li><i class="fa fa-clock-o" aria-hidden="true"></i> {moment(Question.createdAt).format('MMMM Do,  YYYY')}</li>
							</ul>
						</div>

						<div class="tags">
							{this.state.Tags.map((tag, index) => (
								<span className="label label-default" style={{ margin: "2px", textDecoration: "none" }}
								>{tag}
								</span>
							))}

						</div>
						<br />
						<div class="content">
							<p>{Question.body} </p>
						</div>
						<br />
					</div>
					<div class="quest_edit">
						<div class="share_div">
							<Link to="/pending_question/">
								<button class="btn btn-success upload_photo_btn2 "
								>Back</button>
							</Link>
							<Link to={"/admin_edit_question/" + this.props.Id}>
								<button type="submit" class="btn btn-success upload_photo_btn2 "

								>Edit</button>
							</Link>


						</div>
					</div>
					<br />
					<br />
					<br />
				</div>
				{/* <!-- post end  --> */}


			</React.Fragment >
		)
	}

}
export default AdminQuestionBody