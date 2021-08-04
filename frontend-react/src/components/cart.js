import React, { Component } from 'react'
import Axios from "axios"
import "../css/cart.css"


class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartList : [],
            productList : [],
            totalPrice : "",
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
                console.log(res.data)
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
                    alert(error)
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
            console.log(res)
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
                    alert(error)
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
            console.log(res)
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
                    alert(error)
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
            console.log(res)
            this.fetchCart()
        })
    }

    checkout = () => {
        Axios.post(`http://127.0.0.1:8000/checkout/cart-checkout/`, null, 
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
                    alert(error)
                    this.props.history.push("/login/")
                })
        })
    }

    render(){
        let productList = this.state.productList
        let cartList = this.state.cartList
        let cci = this.cartCountIncrement
        let ccd = this.cartCountDecrement
        let cd = this.cartDelete
        let checkout = this.checkout

        let renderCheckoutButton = () => {
            if(productList[0] !== undefined){
                console.log(productList)
                return (<button className = "btn btn-success" style = {{width: "100%"}} onClick = {checkout}>Checkout</button>)
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
                                                            ccd(product.id)
                                                        }else{
                                                            cd(product.id)
                                                        }
                                                    }}></i>
                                                    <h5 class="text-grey mt-1 mr-1 ml-1">&nbsp;{cart.count}&nbsp;</h5>
                                                    <i class="fa fa-plus text-success" onClick = {()=>cci(product.id)}></i>
                                                </div>
                                                <div>
                                                    <h5 class="text-grey">${product.price*cart.count}</h5>
                                                </div>
                                                <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger" onClick = {()=>cd(product.id)}></i></div>
                                            </div>  
                                        )
                                    }
                                })}
                                <br />
                                {renderCheckoutButton()}
                                
                            </div>
                        </div>
                    </div>
                </ui>
            </div>
        )
    }
}

export default Cart