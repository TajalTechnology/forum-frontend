import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Config from "../BaseUrl/Config";
import InvalidFeedBack from "../Auth/InvalidFeedBack";

const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const style = {
	color: 'red',
  }
  const teAl = {
	textAlign: 'center',
	color: 'red',
  }
const validateForm = ({ errors, ...rest }) => {
	let valid = true;

	// validate form errors being empty
	Object.values(errors).forEach(val => {
		val.length > 0 && (valid = false);
	});

	// validate the form was filled out
	Object.values(rest).forEach(val => {
		val === null && (valid = false);
	});

	return valid;
};
class Signup extends Component {
	error_msg = {
		fontSize: 11,
		color: 'red'
	}
	constructor(props) {
		super(props);


		this.state = {
			isModalClose: this.props.show,
			password: null,
			email: null,
			userName: null,
			modal: '',
			form_empty: '',
			success:false,
			loading: false,
			error_message: "",
			
			errors: {
				password: '',
				email: '',
				userName: '',
			}
		}
	}

	// validation part start
	handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		let errors = this.state.errors;

		switch (name) {
			case 'email':
				errors.email =
					validEmailRegex.test(value)
						? ''
						: 'Email is not valid!';
				break;

			case 'password':
				errors.password =
					value.length < 8
						? 'Password must be at least 8 characters long!'
						: '';
				break;

			case 'userName':
				errors.userName =
					value.length < 3 || value.length > 50
						? 'First Name must be between 3 to 50 characters!'
						: '';
				break;

			default:
				break;
		}


		this.setState({ errors, [name]: value });
	}
	handleSubmit = (event, history) => {
		event.preventDefault();
		if (validateForm(this.state)) {
			this.setState({
				loading: true,
				error_message: "",
				form_empty: ""
			},
			()=> {window.setTimeout(()=>{this.setState({
				success:false,loading: false
			})},5000)}
			)
			const obj = {
				userName: this.state.userName,
				email: this.state.email,
				password: this.state.password
			};

			axios.post(`${Config.apiUrl}/api/sign-up`, obj)
				.then(res => {
					
					this.setState({
						success: true,
						password: '',
						email: '',
						userName: '',
						loading: false,
						form_empty:''
					},
					()=> {window.setTimeout(()=>{this.setState({
						success:false})},3000)})

				}).catch((err) => {
					// console.log('120 line',  err.response.data.error);
					// this.setState({
					// 	error_message:err.response.data.error
						
					// })
					if (err.response) {
						if (err.response.status === 406) {
							this.setState({
							},
							()=> {window.setTimeout(()=>{this.setState({
								error_message:'This email or username is already exist!'})},5000)}
							)
						}
					}
				
				})

		} else {
			console.error('Invalid Form')
			this.setState({
				form_empty: "Invalid form please input value"
			})

		}
	}
	
	render() {
		const { errors, userName, email, password } = this.state;
		return (
			<React.Fragment>
				{  this.props.show &&
					<div class="modal" tabindex="-1" role="dialog" id="signupmodal" show={this.props.isModalOpen}>
						<div class="modal-dialog modal_width" role="document">
							<div class="modal-content" style={{ borderRadius: "0px" }}>
								<a href="#"
									onClick={() => {
										this.props.manageState()
										let element = document.getElementsByClassName("modal-backdrop")
										while (element.length > 0) element[0].remove();
									}}
								>
									<i class="fa fa-window-close window_close_icon" ></i></a>
								<div class="modal-header boder-bottom-color">
									<p class="modal_p">Sign up now</p>
									<p class="modal_sugg">Fill in the form below to get insant access:</p>

								</div>
								{this.state.success &&
                                    <div className="msg_des">
									<p style={{color:"#44ce6f"}}>Successfully Registere!!!</p>
								</div>
                                 } 

								{
								this.state.loading && 
								<div className="msg_des">
								<h2>Processing...</h2>
								</div>
								}

								{
								this.state.error_message && 
									<div style={style}>
								<p style={teAl}>{this.state.error_message}</p>
								</div>
								
								
								}
								
								<div class="modal-body modal-body-design2">
									<form onSubmit={this.handleSubmit}>
										<div class="form-group">
											<input type="username" class="form-control fontcontrol" id="text"
												placeholder="Username.." name="userName"
												onChange={this.handleChange} value={userName} />

											<div>
												{errors.userName.length > 0 &&
													<span className='error error_msg' style={this.error_msg}>{errors.userName}</span>}
											</div>
										</div>
										<div class="form-group">
											<input type="email" class="form-control fontcontrol" id="text"
												name="email" placeholder="Email.."
												onChange={this.handleChange} value={email} />

											<div>
												{errors.email.length > 0 &&
													<span className='error error_msg' style={this.error_msg}>{errors.email} </span>}
											</div>
										</div>
										<div class="form-group">
											<input type="password" class="form-control fontcontrol" id="text" name="password"
												placeholder="Password.."
												onChange={this.handleChange} value={password} />
											<div>
												{errors.password.length > 0 &&
													<span className='error error_msg' style={this.error_msg}>{errors.password}</span>}
											</div>
											<div>
												<span className='error' style={this.error_msg}>{this.state.form_empty}</span>
											</div>
										</div>
										<button 
										type="submit"
										 class="btn btn-primary btn_secoend" 
										 disabled={(this.state.loading == true)}
										  >Sign up!</button>
									</form>
								</div>
								<div class="modal-footer boder-bottom-color">
									<p class="modal_sugg2">Have an Account?<a  class="signup"><strong> Login
								</strong></a></p>
								</div>
							</div>
						</div>
					</div>
				}
			</React.Fragment>
		)
	}

}
export default Signup