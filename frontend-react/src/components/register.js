import React, { Component } from 'react'
import axiosInstance from "../axios";
import {useHistory} from "react-router-dom";


class Register extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <h1>Register</h1>
            </div>
        )
    }
}

export default Register