import React, { Component } from 'react'
import "../css/register-login.css"
import axios from "axios"

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
        }
        console.log(props)
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://127.0.0.1:8000/";

        const axiosInstance = axios.create({
            baseURL: url,
            timeout: 5000
        })

        axiosInstance
            .post(`auth-token/`, {
                username: this.state.username,
                password: this.state.password
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                this.props.history.push('/');
                this.setState({
                    loggedIn: true
                })
            })
            .catch((error) => {
                if (error.response){
                    document.getElementById("invalid").innerHTML = "Invalid credentials"
                }
            })

        
    }

    render(){
        return (
            <div className="col-md-4 col-md-offset-4" id="login">
                <section id="inner-wrapper" className="login">
                    <article>
                        <form>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="UserName" onChange = {this.usernameChangeHandler} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="password" className="form-control" placeholder="Password" onChange = {this.passwordChangeHandler} />
                                </div>
                            </div>
                            <div id = "invalid" className = "error-message"></div>
                            <button className="btn btn-success btn-block" onClick = {this.handleSubmit}>Login</button>
                        </form>
                    </article>
                </section>
            </div>
        )
    }
}

export default Login