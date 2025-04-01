import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { links } from './links';
import { ToggleSwitch } from '..'
import { IoCartOutline } from "react-icons/io5";
import CartComponent from '../Cart/Cart';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);
  const { cartItems } = useSelector((state: RootState) => state.cart); 
  return (
    <nav className="flex items-center justify-evenly w-full min-h-16 py-3 shadow-sm border-b border-gray-400 dark:bg-gray-900 border-dashed relative">
      <img src={logo} alt="Logo" />
      <div className="flex gap-x-7 items-center">
        {links.map((link, index) => (
          <Link key={index} to={link.path} className="text-base font-bold text-black/95 dark:text-gray-100 hover:text-black dark:hover:text-gray-300">
            {link.li}
          </Link>
        ))}
        <div className='relative' onClick={() => setShowCart(!showCart)}>
          <IoCartOutline className='text-2xl text-black/95 dark:text-gray-100 cursor-pointer' />
          <div className='absolute -top-2 -left-3 bg-red-500 w-5 h-5 rounded-full grid place-items-center text-xs text-white'>{cartItems.length}</div>
        </div>
        <ToggleSwitch />
      </div>
      {
        showCart && <CartComponent />
      }
    </nav>
  );
};

export default NavBar;