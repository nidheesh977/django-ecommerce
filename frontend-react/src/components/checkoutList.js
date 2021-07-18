import React, { Component } from "react"
import Axios from "axios"

class CheckoutList extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartCheckout : {},
            productCheckout : {}
        }
        this.fetchCartCheckout = this.fetchCartCheckout.bind(this)
        this.fetchProductCheckout = this.fetchProductCheckout.bind(this)
    }

    componentWillMount(){
        this.fetchCartCheckout()
        this.fetchProductCheckout()
    }

    fetchCartCheckout(){
        Axios.get(`http://127.0.0.1:8000/checkout/cart-checkout/`,
        {
            headers: {
                "Authorization": `JWT `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            console.log(res)
            this.setState({
                cartCheckout : res.data
            })
        })
    }

    fetchProductCheckout(){
        Axios.get(`http://127.0.0.1:8000/checkout/product-checkout/`,
        {
            headers: {
                "Authorization": `JWT `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            console.log(res)
            this.setState({
                productCheckout : res.data
            })
        })
    }

    render(){
        var productCheckout = this.state.productCheckout
        var cartCheckout = this.state.cartCheckout
        return(
            <div>
                <h1>Product Checkouts :</h1>
                {productCheckout.map(function(product, index){
                    return(
                        <div>
                            <h3>{index} - {product.delivery_status}</h3>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CheckoutList