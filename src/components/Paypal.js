import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
    const initialOptions = {
        clientId: "AZ7agaDhDGKsqtT5axOI-_h-LBynclfye44Xx9BgS3KtNwnix7i_oMFma_uJsabIt6fb9suZWJrSG7b3",
        // Add other options as needed
    };
    return (
        <div className="App">
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons />
            </PayPalScriptProvider>
        </div>
    );
}