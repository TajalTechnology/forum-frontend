import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import SearchBar from "./SearchBar"
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Dropdown from './Dropdown';

const navBar = {
		position: 'relative',
		minHeight: '50px',
		marginBottom: '0',
		border: '1px solid transparent'
}

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			IsAuthenticated: false,
			ModalOpen: false
		};
	}

	logout = () => {
		sessionStorage.clear();
		localStorage.clear();
		this.setState({
			IsAuthenticated: false
		})
	}


	componentDidMount() {
		setInterval(() => {
			if (window.localStorage.getItem('jwt-token')) {
				this.setState({
					IsAuthenticated: true
				})
			}

		}, 1000);
	}
	openModal = () => this.setState({ ModalOpen: !this.state.ModalOpen});




	render() {
		let authenticationMenu
		if (!this.state.IsAuthenticated) {
			authenticationMenu =
				<React.Fragment>
					<li>
						<a href="#" data-toggle="modal" data-target="#mymodal" onClick={this.openModal} >Login</a>
					</li>
					<li>
						<a href="#" className="btn  btn-sm btn-user" data-toggle="modal" data-target="#signupmodal" onClick={this.openModal} >Sign
						Up
					   </a>
					</li>
				</React.Fragment>

		} else {
			authenticationMenu =
				<React.Fragment>

					<Dropdown
						logout={() => {

							this.logout()
						}}
						IsAuthenticated={this.state.IsAuthenticated}
					/>
				</React.Fragment>
		}
		return (
			<React.Fragment>
				<div className="nav_bg">
				<div className="container">
				<div className="row">
					<div className="col-md-3 col-sm-3 col-xs-5">
					<Link to="/" className="navbar-brand header-logo"><img src="https://efrana.github.io/Tech_blogV1.2UI/img/uplogo.png" className="img-responsive image_design"
									alt="Logo" /></Link>
					</div>
					<div className="col-md-6 col-sm-5 hiddenxs">
					<SearchBar />
					</div>
					
					<div className="col-md-3 col-sm-4 col-xs-7">
					<ul className="nav navbar-nav navbar-right">
									{authenticationMenu}
									
                                   <li>
									<div class="dropdown pdl"  >
										<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i
											class="fa fa-align-justify dropbtn gearicon_new"></i></a>
										<ul class="dropdown-menu menudesign3">
											<li>	
											<Link to ="/">
												<a href="#" class="mainMenu2">
													<i class="fa fa-home" style={{ color: "gray" }}></i>
													<span class="logout"> Home</span>
													</a>
													</Link>
													<hr className="hr_des"/>
												
											</li>
											
											<li>
											<Link to ="/question_list">
												<a href="#" class="mainMenu2">
													<i class="fas fa-globe" style={{ color: "gray" }}></i>
													
													<span class="logout" > Question List</span>
													</a>  
													</Link>
													<hr className="hr_des"/>    
											</li>

											{this.state.IsAuthenticated &&
											<li>
												<Link to ="/ask_question">
												<a href="#" class="mainMenu2">
													<i class="fa fa-question" style={{ color: "gray" }}></i>
													
													<span class="logout" > Ask Question</span></a></Link>
													<hr className="hr_des"/>
											</li>
	                                        }	
											<li>
											<Link to ="/tags">
												<a href="#" class="mainMenu2">
													<i class="fa fa-tags" style={{ color: "gray" }}></i>
													
													<span class="logout" > Tags</span></a></Link>
											</li>
											{/* </div> */}
										</ul>
									</div>
									</li>
                              {/* dropdown */}

								</ul>
					</div>
					<div className="col-md-12 cus_search_show">
					<SearchBar />
					</div>
				</div>
				</div>
			</div>
			
				<Login
					show={this.state.ModalOpen}
					manageState={() => {
						this.openModal()
					}}
				/>
				<Signup
					show={this.state.ModalOpen}
					manageState={() => {
						this.openModal()
					}}

				/>

			</React.Fragment>
		)
	}

}
export default withRouter(NavBar)
