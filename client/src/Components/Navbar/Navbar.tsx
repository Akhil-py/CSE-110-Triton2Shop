import './Navbar.css'
import logo_light from "../../assets/Horizontal_Blue_Yellow.png"
import logo_dark from "../../assets/Horizontal_White_Yellow.png"
import search_icon_light from "../../assets/search-w.png"
import search_icon_dark from "../../assets/search-b.png"
import toggle_light from "../../assets/night.png"
import toggle_dark from "../../assets/day.png"
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from "react-router-dom";
export const Navbar: React.FC = () => {
    const { theme, setTheme } = useContext(AppContext)
    const toggleTheme = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light');
    }
    return (
        <div className='navbar'>
            <div className='logo-search-container'>
                <Link to="/">
                    <img src={theme === 'light' ? logo_light : logo_dark} alt="UCSD Triton logo" className='logo' />
                </Link>
                <div className='search-box'>
                    <input type="text" placeholder='Search'></input>
                    <img src={theme == 'light' ? search_icon_light : search_icon_dark} alt="" className='search-icon' />
                </div>
            </div>
            <div className='nav-items'>
                <Link to="/login">Log in</Link>
                <img onClick={() => { toggleTheme() }} src={theme == 'light' ? toggle_light : toggle_dark} alt="" className='toggle-icon' />
            </div>
        </div>
    );
};