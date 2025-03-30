import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { links } from './links';
import { ToggleSwitch } from '..'
const NavBar = () => {


  return (
    <nav className="flex items-center justify-evenly w-full min-h-16 py-3 shadow-sm border-b border-gray-400 dark:bg-gray-900 border-dashed">
      <img src={logo} alt="Logo" />
      <div className="flex gap-x-7 items-center">
        {links.map((link, index) => (
          <Link key={index} to={link.path} className="text-base font-bold text-black/95 dark:text-gray-100 hover:text-black dark:hover:text-gray-300">
            {link.li}
          </Link>
        ))}
        <ToggleSwitch />
      </div>
    </nav>
  );
};

export default NavBar;