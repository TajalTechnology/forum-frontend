import React, { Component } from 'react';


const counter = {
    border: '1px solid #eeeeee' ,
  marginTop: '32px',
  float: 'left',
  width: '100%'
}
const singleCounter ={
    float: 'left',
    width: '25%',
	padding: '28px 15px 28px', 
}

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
    <div className="aboutus-area">
  <div className="container">
    <div className="row">
      <div className="col-xs-12">
        <div className="col-md-4 col-sm-6 col-xs-12">    
          <div className="aboutus-image float-left hidden-sm"><img src={process.env.PUBLIC_URL + '/asset/img/5.png'} width="360px" height="350" alt /></div>
        </div>
        <div className="col-md-8 col-sm-6 col-xs-12">
          <div className="aboutus-content ">
            <h1>About us <span>Who we are</span></h1>
            <h4>Details</h4>
            <p>Our forum is a place to engage in compassionate dialogue to express ourselves, ask questions, open up ideas, and learn from one another. The platform is about creating open, honest and well-mannered discussions about interested topics on any issue. The answer to a question is available with guidance materials or the user will be directed to the appropriate resources. This is the place to chat with passionate members of the relevant community, Moderators, and of course directly to members of the forum.</p>
            <div className="counter ">
              <div className="single-counter text-center" >
                <h2 className="counter">100</h2>
                <p>Total Question</p>
              </div>
              <div className="single-counter text-center">
                <h2 className="counter">10</h2>
                <p>Total Visitors</p>
              </div>
              <div className="single-counter text-center">
                <h2 className="counter">5</h2>
                <p>Client</p>
              </div>
              <div className="single-counter text-center">
                <h2 className="counter">6</h2>
                <p>Partner</p>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </div>
  </div>
</div>

         );
    }
}
 
export default About;