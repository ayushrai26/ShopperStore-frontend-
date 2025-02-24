import { useEffect, useState } from 'react';
import '../styles/Header.css';
import { CiShop, CiSearch, CiShoppingCart } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { toast } from 'react-toastify';

function Header({ setSearchQuery, cartCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [autoSearch, setAutoSearch] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  // Sidebar toggle
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Handle Search Input Change
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Fetch search suggestions with debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search.length > 1) {
        fetch(`https://dummyjson.com/products/search?q=${search}`)
          .then((res) => res.json())
          .then((data) => setAutoSearch(data.products)) // Fix: Access 'products' array
          .catch((err) => console.error(err));
      } else {
        setAutoSearch([]);
      }
    }, 300); // 300ms debounce time

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Fetch stored username
  useEffect(() => {
    const storedData = localStorage.getItem('username');
    if (storedData) {
      setUser(storedData);
    }
  }, []);

  // Handle Enter Key Search
  const keyChange = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(search);
      setAutoSearch([]); // Hide suggestions on search
    }
  };

  // Clear search when clicking logo/home
  const searchBlank = () => {
    setSearchQuery('');
    setSearch('');
    navigate('/');
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear stored user data
    localStorage.removeItem("products"); // Clear cart data
    localStorage.removeItem('username');
    localStorage.removeItem("isLoggedIn");
    toast.success('Logged Out');
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className='main-container'>
      <div className='bar'>
        <button onClick={handleClick} className="menu-button">
          <FaBars />
        </button>
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className='top_icons'>
          <span className='hello_user_icon'><FaUserAlt /></span>
          <span className='hello_user'>Hello! {user}</span>
          <button className="close-button" onClick={handleClick}>
            <IoMdClose />
          </button>
        </div>
        <ul>
          <li className='sidebar_icon'><span><CgProfile /></span><Link to='/profile'><span>Profile</span></Link></li>
          <li className='sidebar_icon'><span><IoIosHelpCircleOutline /></span><Link to='/help'><span>Help</span></Link></li>
          <li className='sidebar_icon'><span><RiFeedbackLine /></span><Link to='/feedback'><span>Feedback</span></Link></li>
          <li className='sidebar_icon'><span><BiLogOutCircle /></span><span onClick={handleLogout} className="logout-link">Logout</span></li>
        </ul>
      </div>

      <div className='logo'>
        <div className='shop_logo'>
          <span><CiShop /></span>
        </div>
        <div className='logo_Name'>
          <span><Link to='/' onClick={searchBlank}>ShopperStore</Link></span>
        </div>
      </div>

      <div className='Home_button'>
        <Link to='/'><button className='button' onClick={searchBlank}>Home</button></Link>
      </div>

      <div className='Search'>
        <div className='search_bar'>
          <input
            type='text'
            placeholder='Search Products'
            className='input'
            onChange={handleChange}
            value={search}
            onKeyDown={keyChange}
          />
          {/* Autocomplete Suggestions */}
          {autoSearch.length > 0 && (
            <ul className="autocomplete-list">
              {autoSearch.map((item, index) => (
                <li key={index} onClick={() => {
                  setSearch(item.title);  // Update input field
                  setSearchQuery(item.title);  // Trigger search
                  setAutoSearch([]); // Hide suggestions
                }}>
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='search_icon'>
          <span><CiSearch /></span>
        </div>
      </div>

      <div className='login'>
        <div className='login_icon'>
          <span><MdOutlineAccountCircle /></span>
        </div>
        <div className='login_para'>
          {user
            ?<Link to='/profile'><button className='button'>{user}</button></Link> 
            : <Link to='/login'><button className='button'>Login</button></Link>
          }
        </div>
      </div>

      <Link to='/cart'>
        <div className='cart_container'>
          <span className='cart_count'>{cartCount}</span>
          <span className='cart_icon'><CiShoppingCart /></span>
          <div className='cart_name'>
            <span>Cart</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Header;
