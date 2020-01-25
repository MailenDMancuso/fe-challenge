import React, { Component } from "react";
import { toast } from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";
import "./styles/users.scss";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const response = await fetch(`https://randomuser.me/api/?results=15`, {
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
    console.log("***** ", users[0]);

    this.setState({ users });
    // debugger;
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
              <Row>
                {users.map(user => (
                  <Col xs={6} className="user-info" key={user.login.uuid}>
                    <img src={user.picture.thumbnail} alt="user-thumbnail" />
                    <span className="user-name">
                      {user.name.first} {user.name.last}
                    </span>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col xs={6}>
            {/* otro componete */}
            <div className="image-container">
              <img
                className="user-bkg"
                src={users[0] && users[0].picture.large}
                alt="user-large"
              />
              <div className="image-description">
                <img
                  className="user-avatar"
                  src={users[0] && users[0].picture.medium}
                  alt="user-medium"
                />
                <div className="image-description-text image-description-title">
                  {users[0] && users[0].name.first}{" "}
                  {users[0] && users[0].name.last}
                </div>
                <div className="image-description-text image-description-subtitle">
                  {users[0] && users[0].gender}
                </div>
              </div>
            </div>
            <div></div>
            <div className="subtitle-description">
              <div className="subtitle">Email Address</div>
              <div>{users[0] && users[0].email}</div>
            </div>
            <div className="subtitle-description">
              <div className="subtitle">Phone Number</div>
              <div>{users[0] && users[0].phone}</div>
            </div>
            <div className="subtitle-description">
              <div className="subtitle">Cell Number</div>
              <div>{users[0] && users[0].cell}</div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UsersList;
