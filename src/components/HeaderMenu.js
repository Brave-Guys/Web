import '../styles/HeaderMenu.css'
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <div className='nav'>
            <img src={logo} alt="StrengthHub" className="nav-logo" />
            <h2 className='nav-logo-text'>StrengthHub</h2>
        </div>
    )
}

export default Header;