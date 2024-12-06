import './Navbar.css'
import logo_light from "../../assets/Horizontal_Blue_Yellow.png"
import search_icon_light from "../../assets/search-w.png"
import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link, useNavigate } from "react-router-dom";
import { Category } from '../../types/types'

export const Navbar: React.FC = () => {
    const { category, setCategory, searchQuery, setSearchQuery, isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();


    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleSignOut = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setIsLoggedIn(false);
                setDropdownVisible(false);
                navigate('/login');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const dropdownItems = [
        { label: 'Post Item', action: () => (window.location.href = '/postitem') },
        { label: 'Request Tracker', action: () => (window.location.href = '/rq-tracker') },
        { label: 'Sign Out', action: handleSignOut },
    ];
    return (
        <div className='navbar'>
            <div className='navbar-top'>
                <div className='logo-search-container'>
                    <Link to="/">
                        <img src={logo_light} alt="UCSD Triton logo" className='navbar-logo' />
                    </Link>
                    <div className='search-box'>
                        <input
                            type="text"
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <img src={search_icon_light} alt="Search Icon" className='search-icon' />
                    </div>
                </div>
                <div className='nav-items'>
                    {!isLoggedIn ? (
                        <Link to="/login">Log in</Link>
                    ) : (
                        <div className="profile-container">
                            <img
                                src="https://images.pexels.com/photos/7486538/pexels-photo-7486538.jpeg/"
                                alt="User Avatar"
                                className="profile-avatar"
                                onClick={toggleDropdown}
                            />
                            {dropdownVisible && (
                                <div className="dropdown-menu">
                                    <Link to="/postitem">Post Item</Link>
                                    <Link to="/rq-tracker">Request Tracker</Link>
                                    <button onClick={handleSignOut}>Sign Out</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className='navbar-categories'>
                {Object.values(Category).map((cat) => (
                    <span
                        key={cat}
                        className={`category-link ${category === cat ? 'active' : ''}`}
                        onClick={() => setCategory(cat)}
                    >
                        {cat}
                    </span>
                ))}
            </div>
        </div>
    );
};