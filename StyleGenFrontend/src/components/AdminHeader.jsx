import { Link } from 'react-router-dom';
import { User, Bell, Search } from 'lucide-react';

const AdminHeader = ({ title }) => {
    return (
        <header style={{
            height: '70px',
            background: '#FFF',
            borderBottom: '1px solid #EEE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 3rem',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: 'calc(100% - 260px)',
            marginLeft: '260px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontWeight: '900', fontSize: '14px' }}>S</span>
                    </div>
                    <span style={{ color: '#111', fontWeight: '900', fontSize: '18px', letterSpacing: '-1px' }}>StyleGen <span style={{ color: '#666', fontWeight: '400', fontSize: '14px', marginLeft: '5px' }}>Admin Portal</span></span>
                </Link>
                <div style={{ width: '1px', height: '20px', background: '#EEE', margin: '0 10px' }}></div>
                <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#111', textTransform: 'uppercase', letterSpacing: '1px' }}>{title || 'Dashboard'}</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} color="#666" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" placeholder="Search data..." style={{ padding: '8px 12px 8px 40px', borderRadius: '20px', border: '1px solid #EEE', fontSize: '13px', width: '200px' }} />
                </div>
                <div style={{ position: 'relative' }}>
                    <Bell size={20} color="#666" />
                    <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--primary)', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #FFF' }}></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid #EEE', paddingLeft: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '12px', fontWeight: '800', margin: 0 }}>Admin User</p>
                        <p style={{ fontSize: '10px', color: '#666', margin: 0 }}>Super Admin</p>
                    </div>
                    <div style={{ width: '35px', height: '35px', background: '#F3F4F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} color="#666" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
