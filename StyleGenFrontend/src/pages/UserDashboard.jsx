import { useState } from 'react';
import { ShoppingBag, User, MapPin, Package, Bell, Settings, LogOut, Heart, Clock, CheckCircle, ChevronRight, FileText, CreditCard, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    const sidebarItems = [
        { id: 'back-to-shop', name: 'Back to Shop', icon: <ChevronRight size={18} />, action: 'navigate' },
        { id: 'dashboard', name: 'Dashboard', icon: <Clock size={18} /> },
        { id: 'order-history', name: 'Order History', icon: <ShoppingBag size={18} /> },
        { id: 'track-orders', name: 'Track Orders', icon: <MapPin size={18} /> },
        { id: 'invoices', name: 'Invoices', icon: <FileText size={18} /> },
        { id: 'profile-settings', name: 'Profile Settings', icon: <User size={18} /> },
    ];

    const dummyOrders = [
        { id: 'SG-90123', date: 'May 12, 2024', status: 'Delivered', total: 'BDT 2,400', items: 2 },
        { id: 'SG-90456', date: 'April 28, 2024', status: 'Shipped', total: 'BDT 1,200', items: 1 },
        { id: 'SG-90789', date: 'April 15, 2024', status: 'Delivered', total: 'BDT 4,800', items: 3 },
    ];

    const dummyInvoices = [
        { id: 'INV-2024-001', date: 'May 12, 2024', amount: 'BDT 2,400', status: 'Paid' },
        { id: 'INV-2024-002', date: 'April 28, 2024', amount: 'BDT 1,200', status: 'Paid' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FBFBFC' }}>
            {/* SIDEBAR */}
            <aside style={{ width: '280px', background: '#FFF', padding: '2.5rem 1.5rem', borderRight: '1px solid #F1F1F1' }}>
                <div style={{ padding: '0 1rem 3.5rem' }}>
                    <h2 style={{ fontSize: '1.6rem', color: '#000', fontWeight: '950', letterSpacing: '-1.5px' }}>StyleGen</h2>
                    <p style={{ fontSize: '10px', color: '#FF4D1C', fontWeight: '900', letterSpacing: '1.5px', marginTop: '5px' }}>USER ACCOUNT</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => item.action === 'navigate' ? window.location.href = '/' : setActiveTab(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '14px 20px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                background: item.id === 'back-to-shop' ? '#111' : (activeTab === item.id ? '#FF4D1C' : 'transparent'),
                                color: (item.id === 'back-to-shop' || activeTab === item.id) ? '#FFF' : '#666',
                                fontWeight: '800',
                                transition: '0.3s',
                                fontSize: '14px',
                                textAlign: 'left',
                                marginBottom: item.id === 'back-to-shop' ? '1.5rem' : '0'
                            }}
                        >
                            {item.icon}
                            {item.name}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '4rem' }}>
                    <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '14px 20px', background: 'none', border: 'none', color: '#EF4444', fontWeight: '800', cursor: 'pointer', fontSize: '14px' }}>
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main style={{ flex: 1, padding: '4rem 5rem' }}>
                <header style={{ marginBottom: '3.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '950', letterSpacing: '-1.5px', color: '#111', marginBottom: '10px' }}>
                        {activeTab === 'dashboard' ? `Welcome back, ${user?.name || 'Artisan'}` :
                            activeTab === 'order-history' ? 'Order History' :
                                activeTab === 'invoices' ? 'Your Invoices' :
                                    activeTab === 'profile-settings' ? 'Account Settings' : 'Track Order'}
                    </h1>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Manage your artisanal lifestyle and track your luxury purchases.</p>
                </header>

                {/* DASHBOARD TAB */}
                {activeTab === 'dashboard' && (
                    <div className="fade-in">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                            <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #F1F1F1', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                <div style={{ background: '#FFF5F2', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <Package color="#FF4D1C" size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '950', margin: '0 0 5px 0' }}>12</h3>
                                <p style={{ color: '#999', fontWeight: '700', fontSize: '13px', margin: 0 }}>TOTAL ORDERS</p>
                            </div>
                            <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #F1F1F1', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                <div style={{ background: '#F0FDFA', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <CheckCircle color="#0D9488" size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '950', margin: '0 0 5px 0' }}>08</h3>
                                <p style={{ color: '#999', fontWeight: '700', fontSize: '13px', margin: 0 }}>DELIVERED</p>
                            </div>
                            <div style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #F1F1F1', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                                <div style={{ background: '#FEFCE8', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <Star color="#CA8A04" size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: '950', margin: '0 0 5px 0' }}>#1</h3>
                                <p style={{ color: '#999', fontWeight: '700', fontSize: '13px', margin: 0 }}>LOYALTY RANK</p>
                            </div>
                        </div>

                        <div style={{ background: '#FFF', padding: '2.5rem', borderRadius: '16px', border: '1px solid #F1F1F1', display: 'flex', gap: '3rem', alignItems: 'center' }}>
                            <div style={{ width: '400px' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1rem' }}>Artisan Premium Membership</h2>
                                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>You are currently on our Silver tier. Spend BDT 5,000 more to unlock Gold benefits and free shipping.</p>
                                <button className="btn-primary" style={{ padding: '12px 25px' }}>Upgrade Plan</button>
                            </div>
                            <div style={{ flex: 1, padding: '2rem', background: '#FAFAFB', borderRadius: '12px', display: 'flex', gap: '2rem' }}>
                                <div>
                                    <p style={{ fontSize: '12px', color: '#999', fontWeight: '800' }}>COUPON APPLIED</p>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900' }}>FIRST20-SG</h4>
                                </div>
                                <div style={{ borderLeft: '1px solid #DDD', paddingLeft: '2rem' }}>
                                    <p style={{ fontSize: '12px', color: '#999', fontWeight: '800' }}>CASHBACK EARNED</p>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '900' }}>BDT 450.00</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ORDER HISTORY TAB */}
                {activeTab === 'order-history' && (
                    <div className="fade-in">
                        <div style={{ background: '#FFF', borderRadius: '16px', border: '1px solid #F1F1F1', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#FBFBFC', borderBottom: '1px solid #F1F1F1' }}>
                                        <th style={{ padding: '20px', fontSize: '12px', fontWeight: '900', color: '#999' }}>ORDER ID</th>
                                        <th style={{ padding: '20px', fontSize: '12px', fontWeight: '900', color: '#999' }}>DATE</th>
                                        <th style={{ padding: '20px', fontSize: '12px', fontWeight: '900', color: '#999' }}>ITEMS</th>
                                        <th style={{ padding: '20px', fontSize: '12px', fontWeight: '900', color: '#999' }}>TOTAL</th>
                                        <th style={{ padding: '20px', fontSize: '12px', fontWeight: '900', color: '#999' }}>STATUS</th>
                                        <th style={{ padding: '20px', fontSize: '12px', fontWeight: '900', color: '#999' }}>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dummyOrders.map(order => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                                            <td style={{ padding: '20px', fontWeight: '900', color: '#111' }}>{order.id}</td>
                                            <td style={{ padding: '20px', color: '#666', fontSize: '14px', fontWeight: '700' }}>{order.date}</td>
                                            <td style={{ padding: '20px', color: '#666', fontSize: '14px', fontWeight: '700' }}>{order.items} Items</td>
                                            <td style={{ padding: '20px', fontWeight: '950', color: '#111' }}>{order.total}</td>
                                            <td style={{ padding: '20px' }}>
                                                <span style={{
                                                    background: order.status === 'Delivered' ? '#F0FDFA' : '#FEFCE8',
                                                    color: order.status === 'Delivered' ? '#0D9488' : '#CA8A04',
                                                    padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '900'
                                                }}>{order.status}</span>
                                            </td>
                                            <td style={{ padding: '20px' }}>
                                                <button style={{ border: 'none', background: 'none', color: '#FF4D1C', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* INVOICES TAB */}
                {activeTab === 'invoices' && (
                    <div className="fade-in">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {dummyInvoices.map(inv => (
                                <div key={inv.id} style={{ background: '#FFF', padding: '2rem', borderRadius: '12px', border: '1px solid #F1F1F1', position: 'relative' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <div style={{ background: '#F1F1F1', padding: '10px', borderRadius: '8px' }}><FileText size={20} color="#666" /></div>
                                        <span style={{ fontSize: '12px', fontWeight: '900', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '4px' }}>{inv.status}</span>
                                    </div>
                                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: '900' }}>{inv.id}</h4>
                                    <p style={{ color: '#999', fontSize: '13px', margin: '0 0 1.5rem 0', fontWeight: '700' }}>Issued on {inv.date}</p>
                                    <div style={{ borderTop: '1px dotted #EEE', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: '950' }}>{inv.amount}</span>
                                        <button style={{ background: '#111', color: '#FFF', border: 'none', padding: '8px 15px', borderRadius: '6px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>Download PDF</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TRACK ORDERS TAB */}
                {activeTab === 'track-orders' && (
                    <div className="fade-in">
                        <div style={{ background: '#FFF', padding: '3.5rem', borderRadius: '16px', border: '1px solid #F1F1F1' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                                <div>
                                    <p style={{ color: '#999', fontSize: '13px', fontWeight: '900', marginBottom: '5px' }}>ORDER #SG-90123</p>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '950', letterSpacing: '-1px' }}>Estimated Delivery: May 15, 2024</h2>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ padding: '8px 18px', background: '#F0FDFA', color: '#0D9488', borderRadius: '50px', fontSize: '13px', fontWeight: '900' }}>ON THE WAY</span>
                                </div>
                            </div>
                            <div style={{ position: 'relative', padding: '2rem 0 5rem' }}>
                                <div style={{ position: 'absolute', top: '45px', left: '0', right: '0', height: '4px', background: '#F1F1F1', zIndex: 0 }}>
                                    <div style={{ width: '75%', height: '100%', background: '#FF4D1C' }}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                                    {['Confirmed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => (
                                        <div key={i} style={{ textAlign: 'center' }}>
                                            <div style={{ width: '26px', height: '26px', background: i <= 2 ? '#FF4D1C' : '#FFF', border: i <= 2 ? 'none' : '2px solid #EEE', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {i <= 2 && <CheckCircle size={15} color="#FFF" />}
                                            </div>
                                            <p style={{ fontSize: '13px', fontWeight: '900', color: i <= 2 ? '#111' : '#AAA', marginBottom: '5px' }}>{step}</p>
                                            <p style={{ fontSize: '11px', color: '#999', fontWeight: '700' }}>{i <= 2 ? 'Completed' : 'Pending'}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '3.5rem', borderTop: '1px solid #F1F1F1', paddingTop: '3.5rem' }}>
                                <div>
                                    <h4 style={{ fontSize: '12px', fontWeight: '900', color: '#999', marginBottom: '1.5rem', letterSpacing: '1px' }}>SHIPPING DETAILS</h4>
                                    <p style={{ fontWeight: '900', margin: '0 0 8px 0', fontSize: '1.1rem' }}>James Alexander</p>
                                    <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.8', fontWeight: '700' }}>House #42, Sector #11, Uttara, Dhaka</p>
                                </div>
                                <div style={{ background: '#FBFBFC', padding: '2rem', borderRadius: '12px', border: '1px solid #F1F1F1' }}>
                                    <h4 style={{ fontSize: '12px', fontWeight: '900', color: '#999', marginBottom: '1.5rem', letterSpacing: '1px' }}>ITEM PREVIEW</h4>
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <div style={{ width: '70px', height: '70px', background: '#FFF', borderRadius: '8px', padding: '5px' }}>
                                            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100" style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" />
                                        </div>
                                        <div><p style={{ fontWeight: '950', margin: '0' }}>Leather Loafer</p><p style={{ fontSize: '12px', color: '#999' }}>Qty: 1</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PROFILE SETTINGS TAB */}
                {activeTab === 'profile-settings' && (
                    <div className="fade-in">
                        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                            <div style={{ background: '#FFF', padding: '3rem', borderRadius: '12px', border: '1px solid #F1F1F1' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#FBFBFC', border: '4px solid #F1F1F1', overflow: 'hidden' }}>
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="" />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginBottom: '5px' }}>{user?.name}</h3>
                                        <p style={{ color: '#999', fontSize: '14px', fontWeight: '700' }}>Luxury Member since 2024</p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', marginBottom: '10px', color: '#999' }}>FULL NAME</label>
                                        <input defaultValue={user?.name} style={{ width: '100%', padding: '15px', border: '1px solid #F1F1F1', borderRadius: '8px', background: '#FBFBFC', fontWeight: '800' }} />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', marginBottom: '10px', color: '#999' }}>EMAIL ADDRESS</label>
                                        <input defaultValue={user?.email} style={{ width: '100%', padding: '15px', border: '1px solid #F1F1F1', borderRadius: '8px', background: '#FBFBFC', fontWeight: '800' }} />
                                    </div>
                                </div>
                                <button className="btn-primary" style={{ marginTop: '3rem', width: '100%', padding: '18px' }}>UPDATE ACCOUNT</button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ background: '#000', color: '#FFF', padding: '2.5rem', borderRadius: '12px' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1rem' }}>Active Orders</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '2rem' }}>
                                        <div style={{ width: '12px', height: '12px', background: '#FF4D1C', borderRadius: '50%' }}></div>
                                        <p style={{ fontWeight: '800' }}>SG-90123 is arriving tomorrow</p>
                                    </div>
                                    <button style={{ width: '100%', marginTop: '2.5rem', padding: '15px', border: '1px solid #333', background: 'transparent', color: '#FFF', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>Track Progress</button>
                                </div>
                                <div style={{ background: '#FFF', padding: '2.5rem', borderRadius: '12px', border: '1px solid #F1F1F1' }}>
                                    <h4 style={{ fontWeight: '900', marginBottom: '1rem' }}>Payment Methods</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#FBFBFC', borderRadius: '8px' }}>
                                        <CreditCard size={20} color="#666" />
                                        <span style={{ fontWeight: '800' }}>Visa ending in 4242</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserDashboard;
