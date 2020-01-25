import React, { Component } from "react";
import { toast } from "react-toastify";
import { Row, Col, Container, Form } from "react-bootstrap";
import "./usersList.scss";
import UserDetails from "../userDetails";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      selectedUser: null,
      selectedGender: ""
    };
  }

  componentDidMount() {
    this.getUsers("https://randomuser.me/api/?page=3&results=20&seed=abc");
  }

  getUsers = async apiUrl => {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (response.status !== 200) {
      return toast.error("Error while recovering users");
    }

    const result = await response.json();
    const users = result.results;

    this.setState({
      users,
      selectedUser: users[0]
    });
  };

  handleClick = userId => {
    const selectedUser = this.state.users.filter(
      user => user.login.uuid === userId
    );
    this.setState({ selectedUser: selectedUser[0] });
  };

  handleChange = async event => {
    const gender = event.target.value.toLowerCase();

    if (gender === "none") {
      this.getUsers("https://randomuser.me/api/?page=3&results=20&seed=abc");
    } else {
      const apiUrl = `https://randomuser.me/api/?gender=${gender}&results=20`;
      this.getUsers(apiUrl);
    }
  };

  render() {
    const { users } = this.state;

    return (
      <Container className="users-main-container">
        <Row>
          <Col xs={6}>
            <div className="users-list">
              <div className="main-title"> Users </div>
              <div className="subtitle">
                If you want to get contact information to specific user, just
                select group and then select him/her from the list below
              </div>

              <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={6}>
                    Select group of users by gender:
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      as="select"
                      onChange={this.handleChange}
                      defaultValue="None"
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>None</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Form>
              <Row>
                {users.map(user => (
                  <Col xs={6} className="user-info" key={user.login.uuid}>
                    <button
                      className="user-interaction"
                      onClick={() => this.handleClick(user.login.uuid)}
                    >
                      <img src={user.picture.thumbnail} alt="user-thumbnail" />
                      <span className="user-name">
                        {user.name.first} {user.name.last}
                      </span>
                    </button>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col xs={6}>
            <UserDetails user={this.state.selectedUser} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UsersList;
