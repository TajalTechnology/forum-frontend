import React, { Component } from 'react';
import axios from "axios";
import Config from "../BaseUrl/Config";
import moment from 'moment';
moment('timestamp').format('MMMM Do YYYY')


const camera_icon = {
  color: 'black',
  marginLeft: '-48px',
  position: 'relative',
  top: '-106px',
  fontSize: '20px'
}

class ProfileSidebar extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      selectedFile: null,
      image: null,
      update: false,
      successalart: false
    }
  }

  componentDidMount() {
    if (!window.localStorage.getItem('jwt-token')) {
      console.log("jh")
    }
    else {
      this.profilePic()

    }
  }
  componentDidUpdate() {
    if (this.state.update === true) {
      this.profilePic()
    }
    else {
      console.log('k')
    }
  }

  fileSelectHandler = event => {
    console.log(event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      profile: this.state.selectedFile,
    };
    const formData = new FormData();

    formData.append('profile', obj.profile)
    const token = window.localStorage.getItem('jwt-token')
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `${token}`
      }
    }
    axios.put(`${Config.apiUrl}/api/profile-pic`, formData, config)
      .then(res => {
        console.log(res.data)
        this.setState({
          update: true,
          successalart: true,

        },
          () => { window.setTimeout(() => { this.setState({ successalart: false }) }, 2000) })

      }
      );
  }


  profilePic() {
    const token = window.localStorage.getItem('jwt-token')
    const config = {
      headers: {
        'Authorization': `${token}`
      }
    }
    axios.get(`${Config.apiUrl}/api/profile`, config)
      .then(response => {
        this.setState({
          image: response.data.imageUrl,

        });
        console.log("profile", response.data.imageUrl)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    console.log("profileData", this.props.profile)
    return (
      <React.Fragment>
        <div class=" profile_sidebar">
          <h3>
            {this.props.sidebarprofile.userName}
          </h3>

          {this.state.image != null &&
            <img class="update_profile" src={" " + this.state.image} />
          }
          {this.state.image === null &&
            <img class="update_profile" src="https://efrana.github.io/Tech_blogV1.2UI/img/profile2.png" />
          }


          <form onSubmit={this.onSubmit}>
            <button type="submit" class="btn btn-success upload_photo_btn" > Upload Photo</button>

            <input type="file" id="file" accept="image/*" onChange={this.fileSelectHandler} />
            <a href="#">
              <label for="file" style={camera_icon}>
                <i class="fa fa-camera " aria-hidden="true"></i>
              </label>
            </a>
          </form>
          {this.state.successalart &&
          <div className="pro_up" >
            <br/>
            Image Uploaded Successfully!!
             </div>
            }
          <div class="profile_deco" >
            <p style={{ color: "gray", fontSize: "13px" }}>Upload a profile picture. Large file will be invalid autometically</p>
            <p style={{ color: "gray", fontSize: "13px" }}>Maximun Upload size 1MB</p>
          </div>

          <p class="profile_para">Account Created <strong>
            {moment(this.props.sidebarprofile.createdAt).format('Do MMMM YYYY')}
          </strong></p>
        </div>

      </React.Fragment>
    )
  }

}
export default ProfileSidebar