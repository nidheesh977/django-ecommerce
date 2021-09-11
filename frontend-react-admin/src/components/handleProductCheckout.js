import React , {Component} from "react"
import Axios from "axios"

class HandleProductCheckout extends Component{

    constructor(props){
        super(props)
        this.state = {
            productCheckouts : [],
            checkoutProducts : [],
        }

        this.fetchProductCheckouts = this.fetchProductCheckouts.bind(this)
        this.fetchCheckoutProducts = this.fetchCheckoutProducts.bind(this)
    }

    componentWillMount(){
        this.fetchProductCheckouts()
        this.fetchCheckoutProducts()
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
        Axios.put("http://127.0.0.1:8000/checkout/product-checkout/"+id+"/", {
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
        let productCheckouts = this.state.productCheckouts
        let checkoutProducts = this.state.checkoutProducts
        let updateDeliveryStatus = this.updateDeliveryStatus

    
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
                                                        <h5 class="text-grey">&#8377;{product.price}</h5>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h6>Checked out at : {productCheckout.created_on.substring(8,10) + productCheckout.created_on.substring(4,8) + productCheckout.created_on.substring(0,4)}</h6>
                                                    <h6>Delivery status : {productCheckout.delivery_status}</h6>
                                                    
                                                    <h6>Change delivery status :</h6>
                                                    
                                                    <input type="radio" class="btn-check" name="delivery_status" id={"processing"+productCheckout.id} autoComplete="off" />
                                                    <label class="btn btn-outline-danger" htmlFor={"processing"+productCheckout.id} onClick = {()=>updateDeliveryStatus(productCheckout.id, "processing")}>Processing</label>
                                                    <input type="radio" class="btn-check" name="delivery_status" id={"packed"+productCheckout.id} autoComplete="off" />
                                                    <label class="btn btn-outline-danger" htmlFor={"packed"+productCheckout.id} onClick = {()=>updateDeliveryStatus(productCheckout.id, "packed")}>Packed</label>
                                                    <input type="radio" class="btn-check" name="delivery_status" id={"out_for_delivery"+productCheckout.id} autoComplete="off" />
                                                    <label class="btn btn-outline-danger" htmlFor={"out_for_delivery"+productCheckout.id} onClick = {()=>updateDeliveryStatus(productCheckout.id, "out_for_delivery")}>Out for delivery</label>
                                                    <input type="radio" class="btn-check" name="delivery_status" id={"delivered"+productCheckout.id} autoComplete="off" />
                                                    <label class="btn btn-outline-danger" htmlFor={"delivered"+productCheckout.id} onClick = {()=>updateDeliveryStatus(productCheckout.id, "delivered")}>Delivered</label>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    }else{
                                        document.getElementById("loading").innerText = "Please wait ..."
                                    }
                                    
                                })}
                                <h3 id = "loading"></h3>
                                
                            </div>
                        </div>
                    </div>
                </ul>
                
            </div>
        )
        
    }
}

export default HandleProductCheckout