import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Row, Col, Container, Form } from "react-bootstrap";
import "./usersList.scss";
import UserDetails from "../userDetails";

const UsersList = () => {
  useEffect(() => {
    getUsers("https://randomuser.me/api/?results=20&");
  }, []);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = async apiUrl => {
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

    setUsers(users);
    setSelectedUser(users[0]);
  };

  const handleClick = userId => {
    const selectedUser = users.filter(user => user.login.uuid === userId);
    setSelectedUser(selectedUser[0]);
  };

  const handleChange = async event => {
    const gender = event.target.value.toLowerCase();

    if (gender === "none") {
      getUsers("https://randomuser.me/api/?results=20");
    } else {
      const apiUrl = `https://randomuser.me/api/?gender=${gender}&results=20`;
      getUsers(apiUrl);
    }
  };

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
                    onChange={handleChange}
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
                    onClick={() => handleClick(user.login.uuid)}
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
          <UserDetails user={selectedUser} />
        </Col>
      </Row>
    </Container>
  );
};

export default UsersList;
