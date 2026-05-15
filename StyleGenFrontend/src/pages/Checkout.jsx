import { useEffect, useState } from 'react';
import api from '../api/api';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        postcode: '',
        address: '',
    });

    useEffect(() => {
        const savedCart =
            JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
    }, []);

    const total = cartItems.reduce(
        (acc, item) => acc + item.price,
        0
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckout = async () => {
        try {
            const { name, email, phone, city, postcode, address } = formData;

            const payload = {
                customer: {
                    name,
                    email,
                    phone,
                    city,
                    postcode,
                    address
                },
                items: cartItems,
                totalAmount: total
            };
            const { data } = await api.post('/checkout', payload);

            console.log(data);

            if (data?.url) {
                window.location.href = data.url;
            } else {
                alert('Payment URL not found');
            }
        } catch (error) {
            console.error(error);
            alert('Checkout failed');
        }
    };

    return (
        <div
            style={{
                padding: '5rem 0',
                background: '#FAFAFA',
                minHeight: '100vh',
            }}
        >
            <div
                className="container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 0.8fr',
                    gap: '3rem',
                }}
            >
                {/* LEFT FORM */}
                <div
                    style={{
                        background: '#FFF',
                        padding: '2rem',
                        borderRadius: '10px',
                    }}
                >
                    <h1
                        style={{
                            marginBottom: '2rem',
                            fontWeight: '900',
                        }}
                    >
                        Checkout
                    </h1>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            style={inputStyle}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            onChange={handleChange}
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={handleChange}
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            name="postcode"
                            placeholder="Postcode"
                            onChange={handleChange}
                            style={inputStyle}
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                minHeight: '120px',
                            }}
                        />
                    </div>
                </div>

                {/* RIGHT SUMMARY */}
                <div
                    style={{
                        background: '#FFF',
                        padding: '2rem',
                        borderRadius: '10px',
                        height: 'fit-content',
                    }}
                >
                    <h2
                        style={{
                            marginBottom: '2rem',
                            fontWeight: '900',
                        }}
                    >
                        Order Summary
                    </h2>

                    {cartItems.length === 0 ? (
                        <p>No items in cart</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    gap: '15px',
                                    marginBottom: '1.5rem',
                                    borderBottom: '1px solid #EEE',
                                    paddingBottom: '1rem',
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '6px',
                                    }}
                                />

                                <div style={{ flex: 1 }}>
                                    <h4>{item.name}</h4>
                                    <p>BDT {item.price}</p>
                                </div>
                            </div>
                        ))
                    )}

                    <div
                        style={{
                            marginTop: '2rem',
                            borderTop: '2px solid #EEE',
                            paddingTop: '1.5rem',
                        }}
                    >
                        <h2>Total: BDT {total}</h2>

                        <button
                            onClick={handleCheckout}
                            style={{
                                width: '100%',
                                marginTop: '2rem',
                                padding: '16px',
                                background: '#FF4D1C',
                                color: '#FFF',
                                border: 'none',
                                borderRadius: '6px',
                                fontWeight: '800',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            Pay with SSLCommerz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '15px',
    border: '1px solid #DDD',
    borderRadius: '6px',
    fontSize: '15px',
    outline: 'none',
};

export default Checkout;