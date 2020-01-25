import React from "react";
import "./userDetails.scss";

export default ({ user }) => (
  <div className="user-details">
    <div className="image-container">
      <img
        className="user-bkg"
        src={user && user.picture.large}
        alt="user-large"
      />
      <div className="image-description">
        <img
          className="user-avatar"
          src={user && user.picture.medium}
          alt="user-medium"
        />
        <div className="image-description-text image-description-title">
          {user && user.name.first} {user && user.name.last}
        </div>
        <div className="image-description-text image-description-subtitle">
          {user && user.gender}
        </div>
      </div>
    </div>
    <div></div>
    <div className="subtitle-description">
      <div className="subtitle-detail">Email Address</div>
      <div>{user && user.email}</div>
    </div>
    <div className="subtitle-description">
      <div className="subtitle-detail">Phone Number</div>
      <div>{user && user.phone}</div>
    </div>
    <div className="subtitle-description">
      <div className="subtitle-detail">Cell Number</div>
      <div>{user && user.cell}</div>
    </div>
  </div>
);
