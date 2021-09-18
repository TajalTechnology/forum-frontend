import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class DesignHome extends Component {
    render() {
        return (
            <React.Fragment>
                <main role="main">
                    <div class="jumbotron jumb_design">
                        <div class="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <h1 class="display-3">Never stop Learning, Keep Asking</h1>
                                    <p>This platform is dedicated to professional and enthusiast programmers to share their knowledge by asking and answering questions</p>
                                </div>
                                <div className="col-md-6">
                                    <img src="https://efrana.github.io/Tech_blogV1.2UI/img/img4.png" class="img-responsive" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="jumbotron awesome_bg">
                    <div class="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div class="add_design">
                                    <h5>WE ARE AWESOME</h5>
                                    <h3>Experience The Tech World With Us</h3>
                                    <p>This is a platform to build a tech community by sharing knowledge</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container ask_pddaing_cus">
                        <div class="row ">
                            <div class="col-md-4 ">
                                <div class="card_design">
                                <img src="https://efrana.github.io/Tech_blogV1.2UI/img/book.jpg" class="home_img" />
                                <h4>Ask New Question</h4>
                                <p>Ask new questions to learn about your problems
                                </p>
                                <a class="btn btn-secondary Rd_col" href="#" role="button">Read More </a>
                                </div>
                            </div>
                            <div class="col-md-4 ">
                              <div class="card_design">
                              <img src="https://efrana.github.io/Tech_blogV1.2UI/img/tech.jpeg" class="home_img" />
                                <h4> Answer Question</h4>
                                <p>Answer questions to share your knowledge with others
                                </p>

                                <p><a class="btn btn-secondary Rd_col" href="#" role="button">Read More</a></p>
                              </div>
                            </div>
                            <div class="col-md-4 ">
                            <div class="card_design">
                            <img src="https://efrana.github.io/Tech_blogV1.2UI/img/qu2.jpg" class="home_img" />
                                <h4> Join Community</h4>
                                <p>Find and join new communities to share and learn new things
                               </p>
                                <p><a class="btn btn-secondary Rd_col" href="#" role="button">Read More</a></p>
                            </div>
                            </div>
                        </div>
                        
                    </div>
                  
                    </div>
                    <div class="jumbotron jumb_design2 about_bg">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 mb-4">
                                    <div className="img">
                                        {/* <img src={about} /> */}
                                        <img src={process.env.PUBLIC_URL + '/asset/img/about.png'} className="img-responsive" width="475px" />

                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div class="media-body mt-4 p-5 d-block about_css">
                                        <h5 class="mt-0 ">About Us</h5>
                                        <p class="about_text des_col">
                                            Our forum is a place to engage in compassionate dialogue to express ourselves, 
                                        ask questions, open up ideas, and learn from one another.The platform is about creating open, honest and well-mannered discussions about interested topics on any issue.
                                        </p>
                                        <p class="about_text des_col">
                                          The answer to a question is available with guidance materials or the user will be directed to the appropriate resources. This is the place to chat with passionate members of the relevant community, Moderators, and of course directly to members of the forum.
                                        </p>
                                        <div class="stage">
                                            <Link class="btn_read_more" to="/about">Read More <i class="fa fa-angle-right" aria-hidden="true"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="jumbotron jumb_design2 card_bg_tb">
                        <h3><span className="des_col"> For developers Community, by developers Community
                        </span></h3>
                        <div id="pricing">
                            <div class="tier">
                                <ul>
                                    <li class="name"><h3>Public Q&A</h3></li>
                                    <li class="price">
                                        $39.99
			                	<span class="period">per month</span></li>
                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolores.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolores.</li>

                                </ul>
                                <a href="#" class="button">Sign Up</a>
                            </div>
                            <div class="tier">
                                <ul>

                                    <li class="name"><h3>Private Q&A</h3></li>
                                    <li class="value">Best Value</li>
                                    <li class="price">
                                        $99.99
				                <span class="period">per month</span></li>

                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolores.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolores.</li>
                                </ul>
                                <a href="#" class="button highlight">Sign Up</a>
                            </div>
                            <div class="tier">
                                <ul>
                                    <li class="name"><h3>Browse jobs</h3></li>
                                    <li class="price">
                                        $149.99
				                    <span class="period">per month</span></li>
                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolores.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, dolores.</li>
                                </ul>
                                <a href="#" class="button">Sign Up</a>
                            </div>
                        </div>

                    </div>

                    <div class="jumbotron about_bg">
                        <div className="container text-center">
                            <div className="row">
                                <div className="networ_community">
                                <h3><span className="des_col "> Highest Question And Answer Developer List</span></h3>
                      
                           
                            <img src={process.env.PUBLIC_URL + '/asset/img/about2.png'} className="img-responsive img_coomunity" alt />
                        </div>
                                
                            </div>
                        </div>

                    </div>

                </main>

            </React.Fragment>
        )
    }

}
export default DesignHome