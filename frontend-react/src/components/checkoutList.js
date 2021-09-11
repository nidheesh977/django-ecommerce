import React , {Component} from "react"
import Axios from "axios"

class CheckoutList extends Component{

    constructor(props){
        super(props)
        this.state = {
            cartCheckouts : [],
            productCheckouts : [],
            checkoutProducts : [],
            checkoutCarts : [],
        }

        this.fetchProductCheckouts = this.fetchProductCheckouts.bind(this)
        this.fetchCartCheckouts = this.fetchCartCheckouts.bind(this)
        this.fetchCheckoutProducts = this.fetchCheckoutProducts.bind(this)
        this.fetchCheckoutCarts = this.fetchCheckoutCarts.bind(this)
    }

    componentWillMount(){
        this.fetchProductCheckouts()
        this.fetchCartCheckouts()
        this.fetchCheckoutProducts()
        this.fetchCheckoutCarts()
    }


    fetchProductCheckouts = () => {
        Axios.get("http://127.0.0.1:8000/checkout/product-checkout/",
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        .then((res)=>{
            this.setState({
                productCheckouts: res.data
            })
        })
        .catch((error)=>{
            Axios.post("http://127.0.0.1:8000/token/refresh/",
            {
                "refresh": localStorage.getItem("refresh-token")
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                localStorage.setItem("token", res.data.access)
                this.fetchProductCheckouts()
            })
            .catch((error)=> {
                this.props.history.push("/login/")
            })
        })
    }
    
    fetchCartCheckouts = () => { 
        Axios.get("http://127.0.0.1:8000/checkout/cart-checkout/",
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        .then((res)=>{
            this.setState({
                cartCheckouts: res.data
            })
        })
        .catch((error)=>{
            Axios.post("http://127.0.0.1:8000/token/refresh/",
            {
                "refresh": localStorage.getItem("refresh-token")
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                localStorage.setItem("token", res.data.access)
                this.fetchCartCheckouts()
            })
            .catch((error)=> {
                this.props.history.push("/login/")
            })
        })
    }

    fetchCheckoutProducts = () => {
        Axios.get("http://127.0.0.1:8000/checkout/checkout-products/",
        {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"}
        })

        .then((res) => {
            this.setState({
                checkoutProducts: res.data
            })
        })
        .catch((error)=>{
            Axios.post("http://127.0.0.1:8000/token/refresh/",
            {
                "refresh": localStorage.getItem("refresh-token")
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                localStorage.setItem("token", res.data.access)
                this.fetchCheckoutProducts()
            })
            .catch((error)=> {
                this.props.history.push("/login/")
            })
        })
    }

    fetchCheckoutCarts = () => {
        Axios.get("http://127.0.0.1:8000/checkout/checkout-carts/",
        {
            headers: {"Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"}
        })

        .then((res) => {
            this.setState({
                checkoutCarts: res.data
            })
        })
        .catch((error)=>{
            Axios.post("http://127.0.0.1:8000/token/refresh/",
            {
                "refresh": localStorage.getItem("refresh-token")
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((res) => {
                localStorage.setItem("token", res.data.access)
                this.fetchCheckoutCarts()
            })
            .catch((error)=> {
                this.props.history.push("/login/")
            })
        })
    }

    deleteProductCheckout = (id) => {
        Axios.delete(`http://127.0.0.1:8000/checkout/delete-product-checkout/`+ id + `/`,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.fetchProductCheckouts()
        })
    }
    
    deleteCartCheckout = (id) => {
        Axios.delete(`http://127.0.0.1:8000/checkout/delete-cart-checkout/`+ id + `/`,
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            this.fetchCartCheckouts()
        })
    }

    
    render(){
        let productCheckouts = this.state.productCheckouts
        let cartCheckouts = this.state.cartCheckouts
        let checkoutProducts = this.state.checkoutProducts
        let checkoutCarts = this.state.checkoutCarts
        let deleteProductCheckout = this.deleteProductCheckout
        let deleteCartCheckout = this.deleteCartCheckout

    
        return(
            <div>
                <ul>
                    <div class="container mt-5 mb-5">
                        <div class="d-flex justify-content-center row">
                            <div class="col-md-8 cart-container">
                                <div class="p-2">
                                    <h2>Product Checkout</h2>
                                </div>
                                <hr />
                                {productCheckouts.map(function(productCheckout, index){
                                    let product = checkoutProducts.find(p => p.id === productCheckout.product);
                                    if (product !== undefined){
                                        document.getElementById("loading").innerText = ""
                                        return(
                                            <div>
                                                <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" key = {index}>
                                                    <div class="mr-1"><img class="rounded" src={product.main_img} width="70" /></div>
                                                    <div class="d-flex flex-column align-items-center product-details">
                                                        <span class="font-weight-bold">{product.name}</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <h5 class="text-grey">&#8377;{product.price-(product.price/100*product.discount)}</h5>
                                                    </div>
                                                    <div class="d-flex align-items-center"  onClick = {()=>deleteProductCheckout(productCheckout.id)}><i class="fa fa-trash mb-1 text-danger"></i></div>
                                                </div>
                                                <div>
                                                    <h6>Checked out at : {productCheckout.created_on.substring(8,10) + productCheckout.created_on.substring(4,8) + productCheckout.created_on.substring(0,4)}</h6>
                                                    <h6>Delivery status : {productCheckout.delivery_status}</h6>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    }else{
                                        document.getElementById("loading").innerText = "Please wait ..."
                                    }
                                    
                                })}
                                <h3 id = "loading"></h3>
                                <hr />
                                <div className = "p-2">
                                    <h2>Cart Checkouts</h2>
                                    <hr />
                                </div>
                            
                                {cartCheckouts.map(function(cartCheckout, index){
                                return(
                                    <div>
                                        
                                        {cartCheckout.cart.map(function(cart_id, index){
                                            let cart = checkoutCarts.find(c => c.id === cart_id)
                                            if (cart !== undefined){

                                                let product = checkoutProducts.find(p => p.id === cart.product);
                                                if (product !== undefined){
                                                    return(
                                                        <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded" key = {index}>
                                                            <div class="mr-1"><img class="rounded" src={product.main_img} width="70" /></div>
                                                            <div class="d-flex flex-column align-items-center product-details">
                                                                <span class="font-weight-bold">{product.name}</span>
                                                            </div>
                                                            
                                                            <div> 
                                                                <h5>{cart.count}</h5>
                                                            </div>
                                                            <div> 
                                                                <h5 class="text-grey">&#8377;{(product.price-(product.price/100*product.discount))*cart.count}</h5>
                                                            </div>
                                                        </div>
                                                        
                                                    )
                                                }
                                            }
                                            
                                        })}
                                        <div>
                                            <h6>Checked out at : {cartCheckout.created_on.substring(8,10) + cartCheckout.created_on.substring(4,8) + cartCheckout.created_on.substring(0,4)}</h6>
                                            <h6>Delivery status : {cartCheckout.delivery_status}</h6>
                                        </div>
                                        <div style = {{textAlign: "center"}}>
                                            <button className = "btn btn-danger"  style = {{width: "100%"}} onClick = {()=>deleteCartCheckout(cartCheckout.id)}>delete</button>
                                        </div>
                                        <hr />
                                        
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
                </ul>
                
            </div>
        )
        
    }
}

export default CheckoutList