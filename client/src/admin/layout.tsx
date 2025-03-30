import { Outlet } from "react-router-dom";
import { SlideBar, AdminNav } from "../containers";

const Layout = () => {

    return (
        <div className="flex relative h-screen">
            {/* slide bare */}
            <SlideBar />
            {/* main content */}
            <div className='flex flex-col  flex-1/4 h-lvh'>
                <AdminNav />
                <div className='w-full h-fit overflow-y-scroll dark:bg-gray-800 p-2'> <Outlet /></div>

            </div>
        </div>
    );
};

export default Layout;
