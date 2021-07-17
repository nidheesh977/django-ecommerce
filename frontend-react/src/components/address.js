import React, {Component} from "react"


class Address extends Component{
    constructor(props){
        super(props)
        this.state = {
            fullName: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
        }
    }
}