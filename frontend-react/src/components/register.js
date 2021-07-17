import React, { Component } from 'react'
import "../css/register-login.css"
import Axios from "axios"


class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            username : "",
            email : "",
            password : "",
            confirmPassword : "",
            showPassword : true,
            registered : false,
        }
    }

    usernameChangeHandler = (e)=>{
        this.setState({
            username : e.target.value
        })
        document.getElementById("usernameCheck").innerHTML = ""
        document.getElementById("username").classList.remove("is-invalid")
    }

    emailChangeHandler = (e)=>{
        this.setState({
            email : e.target.value
        })
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(e.target.value).toLowerCase())){
            document.getElementById("emailCheck").innerHTML = ""
            document.getElementById("email").classList.remove("is-invalid")
        }
    }

    passwordChangeHandler = (e)=>{
        this.setState({
            password : e.target.value
        })
    }

    confirmPasswordChangeHandler = (e)=>{
        this.setState({
            confirmPassword : e.target.value
        })
        if(e.target.value!==this.state.password.substring(0, e.target.value.length)){
            document.getElementById("passwordCheck").innerHTML = "Password doesn't match"
            document.getElementById("password").classList.add("is-invalid")
            document.getElementById("confirmPassword").classList.add("is-invalid")
        }else{
            document.getElementById("passwordCheck").innerHTML = ""
            document.getElementById("password").classList.remove("is-invalid")
            document.getElementById("confirmPassword").classList.remove("is-invalid")
        }
    }

    passwordChangeType=()=>{
        if(this.state.showPassword){
            document.getElementById("password").type="text"
            document.getElementById("confirmPassword").type="text"
        }else{
            document.getElementById("password").type="password"
            document.getElementById("confirmPassword").type="password"
        }
        this.setState((prev, props)=>({
            showPassword:!prev.showPassword
        }))
    }

    emailValidation = ()=>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(this.state.email).toLowerCase())){
            document.getElementById("emailCheck").innerHTML = "Email invalid"
            document.getElementById("email").classList.add("is-invalid")
        }else{
            document.getElementById("emailCheck").innerHTML = ""
            document.getElementById("email").classList.remove("is-invalid")
        }
    }


    register = (e)=>{

        e.preventDefault()

        Axios.post(`http://127.0.0.1:8000/accounts/register/`, {
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
            console.log(res.data)
            this.props.history.push("/login/")
        })
        .catch(error => {
            console.log(error)
            document.getElementById("formCheck").innerHTML = "Something went wrong"
        })
        
    }

    render(){
        return (
            <div class="col-md-4 col-md-offset-4" id="login">
                <section id="inner-wrapper" className="login">
                    <article>
                        <form>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" id = "username" placeholder="Username" onChange = {this.usernameChangeHandler}/>
                                </div>
                                <div id = "usernameCheck" className = "error-message"></div>
                            </div>
                            <div className="form-group">
                                <div class="input-group">
                                    <input type="email" className="form-control" id = "email" placeholder="Email Address" onChange = {this.emailChangeHandler} onBlur = {this.emailValidation}/>
                                </div>
                                <div id = "emailCheck" className = "error-message"></div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="password" className="form-control" id = "password" placeholder="Password" onChange = {this.passwordChangeHandler}/>
                                    
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="input-group">
                                    <input type="password" className="form-control" id = "confirmPassword" placeholder="Confirm Password" onChange = {this.confirmPasswordChangeHandler}/>
                                </div>
                                <div id = "passwordCheck" className = "error-message"></div>
                            </div>
                            <label><input type = "checkbox"  onClick = {this.passwordChangeType}/><span style = {{fontSize : "15px", color: "grey", fontWeight: "500"}}>showPassword</span></label> <br />
                            <div id = "formCheck" className = "error-message"></div>
                            <button className="btn btn-success btn-block" onClick = {this.register}>Register</button>
                        </form>
                    </article>
                </section>
            </div>
        )
    }
}

export default Register