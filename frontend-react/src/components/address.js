import React, { Component } from 'react'
import "../css/register-login.css"
import Axios from "axios"


class Address extends Component{
    constructor(props){
        super(props)
        this.state = {
            fullname : "",
            addressLine1 : "",
            addressLine2 : "",
            city : "",
            state : "",
            pincode : "",
            country : "",
            mobile : ""
        }
    }

    changeHandler = (e) => {
        if (e.target.name === "fullname"){
            this.setState({
                fullname : e.target.value
            })
        }
        else if (e.target.name === "addressline1"){
            this.setState({
                addressLine1 : e.target.value
            })
        }
        else if (e.target.name === "addressline2"){
            this.setState({
                addressLine2 : e.target.value
            })
        }
        else if (e.target.name === "city"){
            this.setState({
                city : e.target.value
            })
        }
        else if (e.target.name === "state"){
            this.setState({
                state : e.target.value
            })
        }
        else if (e.target.name === "pincode"){
            this.setState({
                pincode : e.target.value
            })
        }
        else if (e.target.name === "country"){
            this.setState({
                country : e.target.value
            })
        }
        else if (e.target.name === "mobile"){
            this.setState({
                mobile : e.target.value
            })
        }
    }




    create = (e)=>{

        e.preventDefault()

        Axios.post(`http://127.0.0.1:8000/accounts/address/`, {
            "fullName": this.state.fullname,
            "addressLine1": this.state.addressLine1,
            "addressLine2": this.state.addressLine2,
            "city": this.state.city,
            "state": this.state.state,
            "pincode": this.state.pincode,
            "country": this.state.country,
            "mobile": this.state.mobile
        },
        {
            headers: {
                "Authorization": `Bearer ` + localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then(res => {
            alert("Address created")
            this.props.history.push("/")
        })
        .catch((error) => {
            Axios.post(`http://127.0.0.1:8000/token/refresh/`, 
                {
                    "refresh": localStorage.getItem("refresh-token")
                },
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
            .then((res)=>{
                localStorage.setItem("token", res.data.access)
                this.create()
            })
            .catch((error) => {
                this.props.history.push("/login/")
            })
        })
        
    }

    render(){
        return (
            <div className="col-md-4 col-md-offset-4" id="login">
                <h3>Create Address</h3>
                <br />
                <br />
                <section id="inner-wrapper" className="login">
                    <article>
                        <form onSubmit = {this.create}>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Full Name" name = "fullname" onChange = {this.changeHandler} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="input-group">
                                    <input type="text" className="form-control" placeholder="Address Line 1" name = "addressline1" onChange = {this.changeHandler} onBlur = {this.emailValidation} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Address Line 2" name = "addressline2" onChange = {this.changeHandler} required/>
                                    
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="input-group">
                                    <input type="text" className="form-control" placeholder="City" name = "city" onChange = {this.changeHandler} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="input-group">
                                    <input type="text" className="form-control" placeholder="State" name = "state" onChange = {this.changeHandler} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="input-group">
                                    <input type="text" className="form-control" placeholder="Pincode" name = "pincode" onChange = {this.changeHandler} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="input-group">
                                    <input type="text" className="form-control" placeholder="Country" name = "country" onChange = {this.changeHandler} required/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div class="input-group">
                                    <input type="text" className="form-control" placeholder="Mobile" name = "mobile" onChange = {this.changeHandler} required/>
                                </div>
                            </div>
                            <input type = "submit" className="btn btn-success btn-block" value = "Create"/>
                        </form>
                    </article>
                </section>
            </div>
        )
    }
}

export default Address