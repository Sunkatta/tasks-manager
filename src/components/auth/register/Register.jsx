import React, { Component } from 'react';
import './Register.css';
import { register } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            age: '',
            isRegistered: false
        }
    }

    onInputChange = (event) => {
        event.persist();

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const { isRegistered, ...user } = this.state;

        register(user).then(() => {
            this.setState({
                isRegistered: true
            });
        }).catch((error) => {
            this.setState({ errorMessage: error.message });
        });
    }

    render() {
        return (
            <>
            { this.state.isRegistered && <Redirect to="/login"></Redirect>}
            <div className="register-wrapper">
                <form className="register-form" onSubmit={this.onFormSubmit}>
                    {this.state.errorMessage && <span className="text-danger">{this.state.errorMessage}</span>}
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" id="name" className="form-control" onChange={this.onInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age: </label>
                        <input type="number" name="age" id="age" className="form-control" onChange={this.onInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" className="form-control" onChange={this.onInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" className="form-control" onChange={this.onInputChange} />
                    </div>
                    <button className="btn btn-primary">Register</button>
                    <Link to="/login">Go to Login</Link>
                </form>
            </div>
            </>
        );
    }
}
