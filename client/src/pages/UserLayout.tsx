import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, NavBar } from '../components'
const UserLayout = () => {
    return (
        <div className="overflow-x-hidden dark:bg-slate-800">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default UserLayout;
