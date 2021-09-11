import React from "react"

import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"

function Payment(){
    return(
        <div>

            <PayPalScriptProvider options = {{"client-id": "AePHxt98aV2jOIwOv-4X9gVIN9b8_9fbGfO2eJC9W-6Zdcldh_zuLukeu4pojKXXbb43TX4O-cFZ9P-9"}}>
                <PayPalButtons style = {{"layout": "horizontal"}}/>
            </PayPalScriptProvider>

        </div>
    )
}

export default Payment