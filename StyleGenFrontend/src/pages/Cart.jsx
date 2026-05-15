import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart =
            JSON.parse(localStorage.getItem('cart')) || [];

        setCartItems(savedCart);
    }, []);

    // REMOVE ITEM
    const removeFromCart = (indexToRemove) => {
        const updatedCart = cartItems.filter(
            (_, index) => index !== indexToRemove
        );

        setCartItems(updatedCart);

        localStorage.setItem(
            'cart',
            JSON.stringify(updatedCart)
        );

        // update navbar count instantly
        window.dispatchEvent(new Event('storage'));
    };

    // TOTAL
    const total = cartItems.reduce(
        (acc, item) => acc + item.price,
        0
    );

    return (
        <div style={{ padding: '5rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>
                Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                gap: '20px',
                                marginBottom: '20px',
                                border: '1px solid #EEE',
                                padding: '20px',
                                borderRadius: '8px',
                                alignItems: 'center'
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    objectFit: 'cover',
                                    borderRadius: '6px'
                                }}
                            />

                            <div style={{ flex: 1 }}>
                                <h2>{item.name}</h2>

                                <p
                                    style={{
                                        color: '#666',
                                        margin: '10px 0'
                                    }}
                                >
                                    {item.description}
                                </p>

                                <h3>BDT {item.price}</h3>
                            </div>

                            {/* DELETE BUTTON */}
                            <button
                                onClick={() =>
                                    removeFromCart(index)
                                }
                                style={{
                                    padding: '10px 18px',
                                    background: '#ff4d4f',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '700'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div
                        style={{
                            marginTop: '3rem',
                            borderTop: '2px solid #EEE',
                            paddingTop: '2rem'
                        }}
                    >
                        <h2>Total: BDT {total}</h2>

                        <button
                            style={{
                                marginTop: '2rem',
                                padding: '15px 30px',
                                background: '#111',
                                color: '#FFF',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '700'
                            }}
                            onClick={() => navigate('/checkout')}
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;