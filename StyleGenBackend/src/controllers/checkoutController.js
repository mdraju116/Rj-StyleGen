import SSLCommerzPayment from 'sslcommerz-lts';

export const checkout = async (req, res) => {
  try {
    const { customer, items, totalAmount } = req.body;

    const {
      name,
      email,
      phone,
      city,
      postcode,
      address
    } = customer; // ✅ FIX HERE

    const store_id = process.env.SSL_STORE_ID;
    const store_passwd = process.env.SSL_STORE_PASSWORD;
    const is_live = false;

    const transactionId = 'TXN_' + Date.now();

    const data = {
      total_amount: totalAmount,
      currency: "BDT",
      tran_id: transactionId,

      success_url:
        'https://rj-style-gen.vercel.app/payment-success',

      fail_url:
        'https://rj-style-gen.vercel.app/payment-fail',

      cancel_url:
        'https://rj-style-gen.vercel.app/payment-cancel',

      ipn_url:
        'https://your-backend.onrender.com/api/checkout/ipn',

      shipping_method: "Courier",
      product_name: "StyleGen Products",
      product_category: "Fashion",
      product_profile: "general",

      // CUSTOMER INFO
      cus_name: name,
      cus_email: email,
      cus_add1: address,
      cus_add2: "N/A",
      cus_city: city,
      cus_state: city,
      cus_postcode: postcode,
      cus_country: "Bangladesh",
      cus_phone: phone,
      cus_fax: "N/A",

      // SHIPPING INFO
      ship_name: name,
      ship_add1: address,
      ship_add2: "N/A",
      ship_city: city,
      ship_state: city,
      ship_postcode: postcode,
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(
      store_id,
      store_passwd,
      is_live
    );

    const apiResponse = await sslcz.init(data);

    console.log("SSL RESPONSE:", apiResponse);

    return res.status(200).json({
      url: apiResponse?.GatewayPageURL || '',
    });

  } catch (error) {
    console.log("CHECKOUT ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};