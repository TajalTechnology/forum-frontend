import React, { Component } from 'react';
import { Link , Redirect} from 'react-router-dom';
class Card extends Component {
   render(){
       return(
        <React.Fragment>
        		<footer>
		<div className="container">
			<div className="row">
				<div className="col-md-4 col-sm-4 col-xs-12">
					<a href=""><img src="https://efrana.github.io/Tech_blogV1.2UI/img/uplogowhie.png" className="img-responsive footer_img_logo"/></a>
				</div>
				<div className="col-md-2 col-sm-2 col-xs-3 cus_width_footer">
					<h3 className="q_link">
						Quick Links
					</h3>
					<div className="footer-links ">
						<span>
							<a href="">Questions</a>
						</span>
						<span>
							<a href="">Help</a>
						</span>
					</div>
				</div>
				<div className="col-md-2 col-sm-2 col-xs-3 cus_width_footer">
					<h3 className="q_link">
						Company
					</h3>
					<div className="footer-links">
						<span>
							<a href="">About</a>
						</span>
						<span>
							<a href="">Privacy Policy</a>
						</span>
						<span>
							<a href="">Contact Us</a>
						</span>
					</div>
				</div>
				<div className="col-md-4 col-sm-4 col-xs-3 cus_width_footer">
					<h3 className="q_link">
						&nbsp;
					</h3>
					<div className="footer-links">
						<span>
							Site design / logo &copy; Develop By
							<a href="" target="_blank">Cloud Production </a>
						</span>
					</div>
				</div>
			</div>
		</div>
	</footer>
        </React.Fragment>
       )
   }

}
export default Card