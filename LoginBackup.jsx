import React, { Component } from 'react';

class LoginBackup extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                	<nav className="navbar navbar-default  nav-top-bg" role="navigation" style={navBar}>
					<div className="container">
						<div className="row">
							<div className="navbar-header">
								<button type="button" className="navbar-toggle" data-toggle="collapse"
									data-target="#bs-example-navbar-collapse-1">
									<span className="sr-only">
										Toggle navigation
						           </span>
									<span className="icon-bar">
									</span>
									<span className="icon-bar">
									</span>
									<span className="icon-bar">
									</span>
								</button>
								<Link to="/" className="navbar-brand header-logo"><img src="https://efrana.github.io/Tech_blogV1.2UI/img/uplogo.png" className="img-responsive image_design"
									alt="Logo" /></Link>
							</div>
							<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
								<ul className="nav navbar-nav navbar-right">
									{authenticationMenu}
									
                                   <li>
									<div class="dropdown" style={{paddingLeft:"38px"}}>
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
								<SearchBar />
							</div>
						</div>
					</div>
				</nav>
			
            </div>
         );
    }
}
 
export default LoginBackup;