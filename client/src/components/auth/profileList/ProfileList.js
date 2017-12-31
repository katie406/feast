import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Header, Form, Button } from 'semantic-ui-react';
import './ProfileList.css';
import Navbar from '../../navbar/Navbar';

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    friendEmail:'',
    friendId: '',
    friendName: '',
    friendAllergies: ''

    };
    this.handleChange = this.handleChange.bind(this);
    
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({[event.target.name]: event.target.value,
    friendEmail: event.target.value     
    });
    // friendEmail = event.target.value;
  }
 

  handleSubmit(event) {
    event.preventDefault();
    axios.get('/api/profiles/findOne?filter[where][email]=' + this.state.friendEmail + '&access_token=' + localStorage.getItem("feastAT"))
    .then((response) => {
       console.log(response);
      this.setState({
        friendId: response.data.id,
        friendName: response.data.name,
        friendAllergies: response.data.allergies
      })
      
      const createFriendship = {
        profileId: this.props.match.params.pid,
        friendId: this.state.friendId,
        friendName: this.state.friendName,
        friendAllergies: this.state.friendAllergies
      }

      console.log(createFriendship);
      axios.post('/api/friends', createFriendship)
      .then((response) => {
        console.log(response);
       
        this.props.history.push("/profile/" + this.props.match.params.pid)        
      })
      .catch((error) => {
        console.log(error);
      });

    })
    .catch((error) => {
      console.log(error);
    });
      
    }

  render() {
    return (
      <div>
       <div id='friend-overlay'>
       </div>
       <Navbar />
       <br />
        <Header as='h1' textAlign='center'>
          FEASTS PATENTED FRIEND FINDER
        </Header>
        
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group unstackable widths={2}>
            <Form.Input label='Your Friends Email Address' placeholder='Email' name="email" onChange={this.handleChange} />
          </Form.Group>
          <Button color='teal'>Find Your Friends</Button>
        </Form>

      </div> 
      
    );
  }
}

export default ProfileList;