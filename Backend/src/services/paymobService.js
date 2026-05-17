import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const createPaymentSession = async({user, items, amount, order_id}) => {
    try {
        // 1- Get auth token
        const authRes = await axios.post(
        "https://accept.paymob.com/api/auth/tokens",
        {
            api_key: process.env.PAYMOB_API_KEY, 
        }
        );
        const authToken = authRes.data.token;

        // 2- Create order on PayMob
        const orderRes = await axios.post(
        "https://accept.paymob.com/api/ecommerce/orders",
        {
            auth_token: authToken,
            delivery_needed: false,
            amount_cents: Math.round(amount * 100), // PayMob uses cents
            currency: "EGP",
            items: [],
            merchant_order_id: order_id.toString() //For webhook
        }
        );
        const orderId = orderRes.data.id;

        // 3- Generate payment key (THIS is the "session")
        const paymentKeyRes = await axios.post(
        "https://accept.paymob.com/api/acceptance/payment_keys",
        {
            auth_token: authToken,
            amount_cents: Math.round(amount * 100),
            expiration: 3600,
            order_id: orderId,
            billing_data: {
            first_name: user.name,
            last_name: "NA",
            email: user.email,
            phone_number: user.phone,
            street: "NA",
            building: "NA",
            floor: "NA",
            apartment: "NA",
            city: "Cairo",
            country: "EG",
            },
            currency: "EGP",
            integration_id: process.env.PAYMOB_INTEGRATION_ID,
        }
        );
        const paymentToken = paymentKeyRes.data.token;

        // 4- Get iframe url
        const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;

        return iframeUrl;

    } catch (err) {
        console.error(err.response?.data || err.message);
    }
}


export default createPaymentSession;