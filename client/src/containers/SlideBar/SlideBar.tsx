import React from 'react'
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { links } from "./links";
const SlideBar = () => {
    const { pathname } = useLocation();
    return (
        <div className="bg-wihite dark:bg-gray-900 w-60 duration-200 flex flex-col h-lvh overflow-y-auto border-r border-gray-300 dark:border-gray-700 overflow-x-hidden">

            <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-7">
                <Link to="/"><img src={logo} className="w-32" alt="" /></Link>
                <h1 className="text-base dark:text-white">Welcome Mohamed</h1>
            </div>
            {/* links */}
            <div className="flex flex-col gap-y-2 mt-7 ">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={link.path}
                        className={`flex items-center gap-x-4 py-3 px-4 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-700 hover:translate-x-2 ${pathname === link.path ? "bg-gray-300 dark:bg-slate-700 translate-x-2": ""} duration-300`} >
                        {React.createElement(link.icon)}
                        <span className="text-sm text-black/95 dark:text-white">{link.li}</span> 
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default SlideBar;
