import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, NavBar } from '../components'
const UserLayout = () => {
    return (
        <div className="overflow-x-hidden bg-primary/50 dark:bg-slate-800 unselectable">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default UserLayout;
