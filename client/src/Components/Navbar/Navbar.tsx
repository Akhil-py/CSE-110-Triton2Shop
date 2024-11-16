import './Navbar.css'
import logo_light from "../../assets/Horizontal_Blue_Yellow.png"
import search_icon_light from "../../assets/search-w.png"
import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from "react-router-dom";
import { Category } from '../../types/types'
export const Navbar: React.FC = () => {
    const { category, setCategory, searchQuery, setSearchQuery } = useContext(AppContext)
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
                    <Link to="/login">Log in</Link>
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