import React, { Component } from "react";
import axios from "axios";
import {
  isEmptyObject,
} from '../helpers/helpers';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post(
        "/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
          this.props.history.push("/reports");
        } else {
          this.setState ({
            error: response.data.msg
          });
        }
      })
      .catch(error => {
        console.log("Log in error", error);
      });
    event.preventDefault();
  }

  renderErrors() {
    const { error } = this.state;
    if (isEmptyObject(error)) {
      return null;
    }

    return (
      <div className="loginError">
        <p key={error}>{error}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="loginForm">
          <div className="formGroup">
            <input
              className="formControl"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="formGroup">
            <input
              className="formControl"
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          {this.renderErrors()}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}