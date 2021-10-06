import React, { Component } from 'react'
import Axios from "axios"
import "../css/cart.css"
import { Link } from "react-router-dom"


class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartList : [],
            productList : [],
            totalPrice : "",
            addresses : [],
            addressSelected : ""
        }

        this.fetchCart = this.fetchCart.bind(this)
    }

    componentWillMount(){
        this.fetchCart()
    }

    fetchCart(){
        Axios.get(`http://127.0.0.1:8000/cart/`,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.setState({
                cartList : res.data
            })
        })
        .then(() => {
            Axios.get(`http://127.0.0.1:8000/cart/cart-products/`,
            {
                headers: {
                    "Authorization": `Bearer `+localStorage.getItem("token"),
                    "Content-Type": 'application/json'
                }
            })
            .then((res)=>{
                this.setState({
                    productList : res.data
                })
            })
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
                }
                )
                .then((res)=>{
                    localStorage.setItem("token", res.data.access)
                    this.fetchCart()
                })
                .catch((error) => {
                    this.props.history.push("/login/")
                })
            
            
        })
    }

    cartCountIncrement = (id) => {
        let cartList = this.state.cartList
        let cart = cartList.find(c => c.product === id);
        Axios.put(`http://127.0.0.1:8000/cart/`+ cart.id + `/`, {
            "product": id,
            "count": cart.count+1,
        },
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.fetchCart()
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
                }
                )
                .then((res)=>{
                    localStorage.setItem("token", res.data.access)
                    this.fetchCart()
                })
                .catch((error) => {
                    this.props.history.push("/login/")
                })
            
            
        })
    }

    cartCountDecrement = (id) => {
        let cartList = this.state.cartList
        let cart = cartList.find(c => c.product === id);
        Axios.put(`http://127.0.0.1:8000/cart/`+ cart.id + `/`, {
            "product": id,
            "count": cart.count-1,
        },
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.fetchCart()
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
                }
                )
                .then((res)=>{
                    localStorage.setItem("token", res.data.access)
                    this.fetchCart()
                })
                .catch((error) => {
                    this.props.history.push("/login/")
                })
            
            
        })
        
    }

    cartDelete = (id) => {
        let cartList = this.state.cartList
        let cart = cartList.find(c => c.product === id);
        Axios.delete(`http://127.0.0.1:8000/cart/`+ cart.id + `/`,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.fetchCart()
        })
    }

    checkout = () => {
        document.getElementById("checkout-popup").style.visibility = "hidden"
        let address = this.state.addressSelected
        let addresses = this.state.addresses

        if (addresses[0]!==undefined){

            if (address===""){
                address = addresses[0].id
            }

            Axios.post(`http://127.0.0.1:8000/checkout/cart-checkout/`, 
            {
                address : address
            }, 
            {
                headers: {
                    "Authorization": `Bearer `+localStorage.getItem("token"),
                    "Content-Type": 'application/json'
                }
            }
            )
            .then((res)=>{
                this.fetchCart()
                window.location.reload();
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
                    }
                )
                    .then((res)=>{
                        localStorage.setItem("token", res.data.access)
                        this.fetchCart()
                        window.location.reload();
                    })
                    .catch((error) => {
                        this.props.history.push("/login/")
                    })
            })
        }
        else{
            this.props.history.push("/address/")
        }
    }

    buyPopupOn = () => {
        Axios.get(`http://127.0.0.1:8000/accounts/address/`,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.setState({
                addresses : res.data
            })
            document.getElementById("checkout-popup").style.visibility = "visible"
        })
        .then(() => {
            let default_address = this.state.addresses[0].id
            document.getElementById(default_address).checked = "true"
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
                }
                )
                .then((res)=>{
                    localStorage.setItem("token", res.data.access)
                    this.buyPopupOn()
                })
                .catch((error) => {
                    this.props.history.push("/login/")
                })
        })
    }

    buyPopupOff = () => {
        document.getElementById("checkout-popup").style.visibility = "hidden"
    }

    addressChangeHandler = (id) => {
        this.setState({
            addressSelected: id
        })
    }

    render(){
        let productList = this.state.productList
        let cartList = this.state.cartList
        let cartCountIncrement = this.cartCountIncrement
        let cartCountDecrement = this.cartCountDecrement
        let cartDelete = this.cartDelete
        let checkout = this.checkout
        let addresses = this.state.addresses
        let buyPopupOn = this.buyPopupOn
        let buyPopupOff = this.buyPopupOff
        let addressChangeHandler = this.addressChangeHandler

        let renderCheckoutButton = () => {
            if(productList[0] !== undefined){
                return (<button className = "btn btn-success" style = {{width: "100%"}} onClick = {buyPopupOn}>Checkout</button>)
            }
        }

        return (
            <div>
                <ui>
                    <div class="container mt-5 mb-5">
                        <div class="d-flex justify-content-center row">
                            <div class="col-md-8 cart-container">
                                <div class="p-2">
                                    <h4>Shopping cart</h4>
                                </div>

                                <hr />

                                {productList.map(function(product, index){
                                    let cart = cartList.find(c => c.product === product.id);
                                    if (cart !== undefined){

                                        return(
                                            <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" key = {index}>
                                                <div class="mr-1"><img class="rounded" src={product.main_img} width="70" /></div>
                                                <div class="d-flex flex-column align-items-center product-details">
                                                    <span class="font-weight-bold">{product.name}</span>
                                                </div>
                                                <div class="d-flex flex-row align-items-center qty">
                                                    <i class="fa fa-minus text-danger" onClick = {()=>{
                                                        if (cart.count>1){
                                                            cartCountDecrement(product.id)
                                                        }else{
                                                            cartDelete(product.id)
                                                        }
                                                    }}></i>
                                                    <h5 class="text-grey mt-1 mr-1 ml-1">&nbsp;{cart.count}&nbsp;</h5>
                                                    <i class="fa fa-plus text-success" onClick = {()=>cartCountIncrement(product.id)}></i>
                                                </div>
                                                <div>
                                                    <h5 class="text-grey">${(product.price-(product.price/100*product.discount))*cart.count}</h5>
                                                </div>
                                                <div class="d-flex align-items-center"><i class="fa fa-trash-o mb-1 text-danger" onClick = {()=>cartDelete(product.id)}></i></div>
                                            </div>  
                                        )
                                    }
                                })}
                                <br />
                                {renderCheckoutButton()}
                                <div className = "overlay" id = "checkout-popup" style = {{textAlign:"center"}}>
                                    <button type="button" className="btn-close btn-close" aria-label="Close" style = {{float: "right", margin: "10px"}} onClick={() => buyPopupOff()}></button>
                                    <div id="text">
                                        
                                        <h5 style = {{textAlign : "left"}}>Select Address :</h5>
                                        {addresses.map(function(address, index){
                                            return(
                                                <label onClick = {() => addressChangeHandler(address.id)} style = {{width:"350px", textAlign:"left"}}>
                                                    <input type = "radio" value = {address.id} name = "address" id = {address.id}/>
                                                    {address.addressLine1 + " , " + address.addressLine2 + " , " + address.city + " ..."}
                                                </label>
                                            ) 
                                            
                                        })}

                                        <button className = "btn btn-primary">
                                            <Link to = "/address/" style = {{color: "white", textDecoration: "none"}}>
                                                Create new address
                                            </Link>
                                        </button>

                                        <hr />

                                        <button className = "btn btn-success disabled"  onClick={checkout} id = "pay-now" >Pay now</button>
                                        <button className = "btn btn-warning"  onClick={checkout} id = "pay-on-delivery" >Pay on delivery</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </ui>
            </div>
        )
    }
}

export default Cart