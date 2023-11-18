import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Invalid method passed try POST");
    return;
  }
  const { name, email, address, city, state, zip, country, cartProducts } =
    req.body;
  await mongooseConnect();
  const productsIds = cartProducts;
  // Displaying same id's
  const uniqueIds = [...new Set(productsIds)];
  const productInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (product) => product._id.toString() === productId
    );
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderData = await Order.create({
    line_items,
    name,
    email,
    address,
    city,
    zip,
    state,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.REDIRECT_URL + "/cart?success=1",
    cancel_url: process.env.REDIRECT_URL + "/cart?canceled=1",
    metadata: { orderId: orderData._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
  });
}
