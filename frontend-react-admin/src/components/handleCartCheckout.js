import React , {Component} from "react"
import Axios from "axios"

class HandleCartCheckout extends Component{

    constructor(props){
        super(props)
        this.state = {
            cartCheckouts : [],
            checkoutCarts : [],
            checkoutProducts: [],
        }

        this.fetchCartCheckouts = this.fetchCartCheckouts.bind(this)
        this.fetchCheckoutCarts = this.fetchCheckoutCarts.bind(this)
        this.fetchCheckoutProducts = this.fetchCheckoutProducts.bind(this)
    }

    componentWillMount(){
        this.fetchCartCheckouts()
        this.fetchCheckoutCarts()
        this.fetchCheckoutProducts()
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

    updateDeliveryStatus = (id, status) => {
        Axios.put("http://127.0.0.1:8000/checkout/cart-checkout/"+id+"/", {
            "delivery_status": status
        },
        {
            headers: {
                "Authorization": `Bearer `+localStorage.getItem("token"),
                "Content-Type": 'application/json'
            }
        }
        )
        .then((res)=>{
            alert("Delivery status updated")
            window.location.reload();
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    render(){
        let cartCheckouts = this.state.cartCheckouts
        let checkoutProducts = this.state.checkoutProducts
        let checkoutCarts = this.state.checkoutCarts
        let updateDeliveryStatus = this.updateDeliveryStatus

    
        return(
            <div>
                <ul>
                    <div class="container mt-5 mb-5">
                        <div class="d-flex justify-content-center row">
                            <div class="col-md-8 cart-container">
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
                                                                <h5 class="text-grey">${product.price*cart.count}</h5>
                                                            </div>
                                                        </div>
                                                        
                                                    )
                                                }
                                            }
                                            
                                        })}
                                        <div>
                                            <h6>Checked out at : {cartCheckout.created_on.substring(8,10) + cartCheckout.created_on.substring(4,8) + cartCheckout.created_on.substring(0,4)}</h6>
                                            <h6>Delivery status : {cartCheckout.delivery_status}</h6>
                                            <h6>Change delivery status :</h6>
                                                    
                                                    <input type="radio" class="btn-check" name="delivery_status" id={"processing"+cartCheckout.id} autoComplete="off" />
                                                    <label class="btn btn-outline-danger" htmlFor={"processing"+cartCheckout.id} onClick = {()=>updateDeliveryStatus(cartCheckout.id, "processing")}>Processing</label>
                                                    <input type="radio" class="btn-check" name="delivery_status" id={"packed"+cartCheckout.id} autoComplete="off" />
                                                    <label class="btn btn-outline-danger" htmlFor={"packed"+cartCheckout.id} onClick = {()=>updateDeliveryStatus(cartCheckout.id, "packed")}>Packed</label>
                                                    <input type="radio" class="btn-check" name="delivery_status" id={"out_for_delivery"+cartCheckout.id} autoComplete="off" />
                                                    <label class="btn btn-outline-danger" htmlFor={"out_for_delivery"+cartCheckout.id} onClick = {()=>updateDeliveryStatus(cartCheckout.id, "out_for_delivery")}>Out for delivery</label>
                                                    <input type="radio" class="btn-check" name="delivery_status" id={"delivered"+cartCheckout.id} autoComplete="off" />
                                                    <label class="btn btn-outline-danger" htmlFor={"delivered"+cartCheckout.id} onClick = {()=>updateDeliveryStatus(cartCheckout.id, "delivered")}>Delivered</label>
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

export default HandleCartCheckout