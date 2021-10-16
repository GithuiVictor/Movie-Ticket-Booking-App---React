import React, { useEffect, useRef } from 'react'

export const Paypal = () => {
    const paypal = useRef();
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "cool looking table",
                            payment_options: {
                                allowed_payment_method: "INSTANT_FUNDING_SOURCE"
                            },
                            amount: {
                                currency_code: "INR",
                                value: 650.00
                            }
                        },
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
                alert("success");

            },
            onError: (err) => {
                console.log(err);
            }
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    )
}


<script
    src="https://www.paypal.com/sdk/js?client-id=AZE7Nuke7XdcXa6B09VxzQMfgXAENIZrA-r9JCLkrY8xR0J3eu-QIRdbshggvzyz4-VQ2fyMK0KnhR4K&currency=INR"></script>
