import React, { Component } from 'react'
import "../css/register-login.css"
import Axios from "axios"

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
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

        Axios.post(`http://127.0.0.1:8000/token-auth/`, {
            "username": this.state.username,
            "password": this.state.password
        },
        {
            headers: {
                "Content-Type": 'application/json'
            }
        }
        )
        .then(res => {
            console.log(res.data.token)
            localStorage.setItem("token", res.data.token)
            this.props.history.push("/")
        })
        .catch(error => console.log(error))

        
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